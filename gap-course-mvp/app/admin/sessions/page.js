import AdminShell from '../../../components/AdminShell';
import QRCard from '../../../components/QRCard';
import { getSupabaseAdmin } from '../../../lib/supabaseServer';
import { demoSessions } from '../../../lib/demo';

export default async function Sessions(){
  const sb=getSupabaseAdmin();
  let sessions=demoSessions,demo=!sb;
  if(sb){const {data}=await sb.from('sessions').select('*').order('session_date',{ascending:false}).limit(30);sessions=data||[];}
  const base=process.env.NEXT_PUBLIC_APP_URL||'http://localhost:3000';
  return <AdminShell title="Sessions" subtitle="Open a session and share the QR at the end of class.">
    {demo && <div className="alert">Demo mode — QR ini untuk preview.</div>}
    <div className="cardGrid">{sessions.map(s=><div className="panel sessionCard" key={s.id}><div><span className={'pill '+(s.status==='open'?'green':'')}>{s.status}</span><h2>{s.subject}</h2><p>{s.session_date||s.date}</p><p>{s.topic}</p></div>{s.status==='open'&&<QRCard url={`${base}/checkin/${s.code}`} code={s.code}/>}</div>)}</div>
  </AdminShell>
}
