import AdminShell from '../../../components/AdminShell';
import { getSupabaseAdmin } from '../../../lib/supabaseServer';
import { demoReflections } from '../../../lib/demo';

export default async function Reflections(){
 const sb=getSupabaseAdmin(); let rows=demoReflections,demo=!sb;
 if(sb){const {data}=await sb.from('reflections').select('*,students(name),sessions(session_date,subject,topic)').order('created_at',{ascending:false}).limit(100); rows=data||[];}
 return <AdminShell title="Student Reflections" subtitle="Every submitted reflection also records attendance.">
  {demo && <div className="alert">Demo mode aktif.</div>}
  <div className="panel"><div className="tableWrap"><table><thead><tr><th>Date</th><th>Student</th><th>Subject</th><th>Understanding</th><th>What I learned</th><th>Difficulty / feedback</th></tr></thead><tbody>
    {rows.map((r,i)=><tr key={r.id||i}><td>{r.sessions?.session_date||r.session_date}</td><td><strong>{r.students?.name||r.student_name}</strong></td><td>{r.sessions?.subject||r.subject}</td><td>{'★'.repeat(Number(r.understanding||0))}</td><td>{r.learned}</td><td>{r.difficulty}</td></tr>)}
  </tbody></table></div></div>
 </AdminShell>
}
