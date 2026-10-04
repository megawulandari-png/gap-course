import AdminShell from '../../../components/AdminShell';
import { getSupabaseAdmin } from '../../../lib/supabaseServer';
import { demoStudents, demoReflections } from '../../../lib/demo';

export default async function Invoices(){
 const sb=getSupabaseAdmin(); let students=demoStudents, refs=demoReflections,demo=!sb;
 if(sb){
  const [{data:s},{data:r}]=await Promise.all([sb.from('students').select('*').eq('active',true),sb.from('reflections').select('student_id,students(name,rate),sessions(session_date,subject)').gte('created_at',new Date(new Date().getFullYear(),new Date().getMonth(),1).toISOString())]);
  students=s||[]; refs=r||[];
 }
 const summaries=students.map(s=>{ const count=refs.filter(r=>r.student_id===s.id || r.student_name===s.name).length; return {...s,count,total:count*Number(s.rate||0)}; });
 return <AdminShell title="Invoices" subtitle="Monthly billing is calculated from completed reflection-attendance records.">
   {demo&&<div className="alert">Demo mode — contoh perhitungan saja.</div>}
   <div className="panel"><div className="tableWrap"><table><thead><tr><th>Student</th><th>Subject</th><th>Sessions</th><th>Rate</th><th>Total</th></tr></thead><tbody>
    {summaries.map(s=><tr key={s.id}><td><strong>{s.name}</strong></td><td>{s.subject}</td><td>{s.count}</td><td>Rp{Number(s.rate||0).toLocaleString('id-ID')}</td><td><strong>Rp{s.total.toLocaleString('id-ID')}</strong></td></tr>)}
   </tbody></table></div></div>
 </AdminShell>
}
