import AdminShell from '../../../components/AdminShell';
import { getSupabaseAdmin } from '../../../lib/supabaseServer';
import { demoReflections } from '../../../lib/demo';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Reflections(){
  const sb = getSupabaseAdmin();
  let rows = demoReflections;
  let demo = !sb;
  let loadError = '';

  if (sb) {
    const { data, error } = await sb
      .from('reflections')
      .select('*,students(name),sessions(session_date,subject,topic)')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      loadError = error.message;
      rows = [];
    } else {
      rows = data || [];
    }
  }

  return <AdminShell title="Student Reflections" subtitle="Every submitted reflection also records attendance.">
    {demo && <div className="alert">Demo mode aktif.</div>}
    {loadError && <div className="alert">Database error: {loadError}</div>}
    <div className="panel"><div className="tableWrap"><table><thead><tr><th>Date</th><th>Student</th><th>Subject</th><th>Understanding</th><th>What I learned</th><th>Difficulty / feedback</th></tr></thead><tbody>
      {rows.map((r,i)=><tr key={r.id||i}><td>{r.sessions?.session_date||r.session_date}</td><td><strong>{r.students?.name||r.student_name}</strong></td><td>{r.sessions?.subject||r.subject}</td><td>{'★'.repeat(Number(r.understanding||0))}</td><td>{r.learned}</td><td>{r.difficulty}</td></tr>)}
      {!rows.length && !loadError && <tr><td colSpan="6">No reflections yet.</td></tr>}
    </tbody></table></div></div>
  </AdminShell>
}
