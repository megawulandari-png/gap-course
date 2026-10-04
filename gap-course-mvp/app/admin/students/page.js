import AdminShell from '../../../components/AdminShell';
import { getSupabaseAdmin } from '../../../lib/supabaseServer';
import { demoStudents } from '../../../lib/demo';

export default async function Students(){
  const sb=getSupabaseAdmin();
  let students=demoStudents, demo=!sb;
  if(sb){ const {data}=await sb.from('students').select('*').order('name'); students=data||[]; }
  return <AdminShell title="Students" subtitle="Student data, access codes, subjects, and session rates.">
    {demo && <div className="alert">Demo mode — data belum tersambung ke Supabase.</div>}
    <div className="panel"><div className="tableWrap"><table><thead><tr><th>Name</th><th>Grade</th><th>School</th><th>Subject</th><th>Rate</th><th>Student code</th></tr></thead><tbody>
      {students.map(s=><tr key={s.id}><td><strong>{s.name}</strong></td><td>{s.grade}</td><td>{s.school}</td><td>{s.subject}</td><td>Rp{Number(s.rate||0).toLocaleString('id-ID')}</td><td><code>{s.access_code}</code></td></tr>)}
    </tbody></table></div></div>
  </AdminShell>
}
