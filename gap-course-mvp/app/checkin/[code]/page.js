import { getSupabaseAdmin } from '../../../lib/supabaseServer';
import { demoSessions } from '../../../lib/demo';

export default async function Checkin({params,searchParams}){
 const {code}=await params; const sp=await searchParams; const sb=getSupabaseAdmin();
 let session=demoSessions.find(s=>s.code===code);
 if(sb){const {data}=await sb.from('sessions').select('*').eq('code',code).maybeSingle();session=data;}
 if(!session) return <main className="studentShell"><div className="reflectionCard"><h1>Session not found</h1><p>Ask your tutor for the latest QR code.</p></div></main>;
 if(sp?.ok) return <main className="studentShell"><div className="reflectionCard successCard"><div className="successIcon">✓</div><h1>Attendance recorded!</h1><p>Thank you for your reflection. See you next class.</p></div></main>;
 return <main className="studentShell"><div className="reflectionCard"><div className="studentBrand">GAP COURSE</div><span className="pill green">3-minute reflection</span><h1>{session.subject}</h1><p className="muted">{session.session_date||session.date} · {session.topic}</p>
  {!sb && <div className="alert">Preview mode. Submission membutuhkan Supabase.</div>}
  <form action="/api/checkin" method="post" className="stack">
   <input type="hidden" name="session_code" value={code}/>
   <label>Your student code</label><input name="student_code" placeholder="e.g. PW0901" required/>
   <label>1. What did you learn today?</label><textarea name="learned" rows="4" placeholder="Write 1–3 short sentences..." required></textarea>
   <label>2. How well do you understand today's lesson?</label>
   <div className="ratingRow">{[1,2,3,4].map(n=><label className="rating" key={n}><input type="radio" name="understanding" value={n} required/><span>{['😕','🙂','😊','🤩'][n-1]}</span><small>{['Not yet','A little','Good','Very good'][n-1]}</small></label>)}</div>
   <label>3. What was difficult, or what do you want to practise again?</label><textarea name="difficulty" rows="3" placeholder="You may also write feedback for your tutor." required></textarea>
   <button className="btn primary big" disabled={!sb}>Submit Reflection & Check In</button>
  </form>
 </div></main>
}
