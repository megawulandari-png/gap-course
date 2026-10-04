import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '../../../lib/supabaseServer';

export async function POST(request){
 const sb=getSupabaseAdmin();
 if(!sb) return NextResponse.json({error:'Supabase is not configured'},{status:503});
 const form=await request.formData();
 const session_code=String(form.get('session_code')||'').trim();
 const student_code=String(form.get('student_code')||'').trim().toUpperCase();
 const learned=String(form.get('learned')||'').trim();
 const difficulty=String(form.get('difficulty')||'').trim();
 const understanding=Number(form.get('understanding')||0);
 const {data:session}=await sb.from('sessions').select('*').eq('code',session_code).eq('status','open').maybeSingle();
 if(!session) return NextResponse.json({error:'Session is closed or not found'},{status:400});
 const now=new Date();
 if(session.opens_at && now < new Date(session.opens_at)) return NextResponse.json({error:'Check-in is not open yet'},{status:400});
 if(session.closes_at && now > new Date(session.closes_at)) return NextResponse.json({error:'Check-in is closed'},{status:400});
 const {data:student}=await sb.from('students').select('*').eq('access_code',student_code).eq('active',true).maybeSingle();
 if(!student) return NextResponse.json({error:'Student code not found'},{status:400});
 const {error}=await sb.from('reflections').upsert({student_id:student.id,session_id:session.id,understanding,learned,difficulty,attendance_status:'present'},{onConflict:'student_id,session_id'});
 if(error) return NextResponse.json({error:error.message},{status:500});
 return NextResponse.redirect(new URL(`/checkin/${session_code}?ok=1`,request.url),303);
}
