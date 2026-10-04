import AdminShell from '../../components/AdminShell';
import { getSupabaseAdmin } from '../../lib/supabaseServer';
import { demoStudents, demoSessions, demoReflections } from '../../lib/demo';

async function getData(){
  const sb = getSupabaseAdmin();
  if(!sb) return {students:demoStudents,sessions:demoSessions,reflections:demoReflections,demo:true};
  const [{data:students},{data:sessions},{data:reflections}] = await Promise.all([
    sb.from('students').select('*').eq('active',true),
    sb.from('sessions').select('*').order('session_date',{ascending:false}).limit(10),
    sb.from('reflections').select('*,students(name),sessions(session_date,subject,topic)').order('created_at',{ascending:false}).limit(20)
  ]);
  return {students:students||[],sessions:sessions||[],reflections:reflections||[],demo:false};
}

export default async function Dashboard(){
  const d = await getData();
  const open = d.sessions.filter(s=>s.status==='open').length;
  const monthRef = d.reflections.length;
  return <AdminShell title="Dashboard" subtitle="Attendance, reflections, and billing in one place.">
    {d.demo && <div className="alert">Demo mode aktif. Hubungkan Supabase untuk memakai data nyata.</div>}
    <section className="stats">
      <div className="stat"><span>Active Students</span><strong>{d.students.length}</strong></div>
      <div className="stat"><span>Sessions</span><strong>{d.sessions.length}</strong></div>
      <div className="stat"><span>Open Check-ins</span><strong>{open}</strong></div>
      <div className="stat"><span>Recent Reflections</span><strong>{monthRef}</strong></div>
    </section>
    <section className="grid2">
      <div className="panel"><div className="panelHead"><h2>Recent sessions</h2></div>
        <div className="tableWrap"><table><thead><tr><th>Date</th><th>Subject</th><th>Topic</th><th>Status</th></tr></thead><tbody>
          {d.sessions.map(s=><tr key={s.id}><td>{s.session_date||s.date}</td><td>{s.subject}</td><td>{s.topic}</td><td><span className={'pill '+(s.status==='open'?'green':'')}>{s.status}</span></td></tr>)}
        </tbody></table></div>
      </div>
      <div className="panel"><div className="panelHead"><h2>Recent reflections</h2></div>
        <div className="reflectionList">
          {d.reflections.slice(0,6).map((r,i)=><article key={r.id||i}><strong>{r.students?.name||r.student_name}</strong><span>{r.sessions?.subject||r.subject} · {r.sessions?.session_date||r.session_date}</span><p>{r.learned}</p></article>)}
        </div>
      </div>
    </section>
  </AdminShell>
}
