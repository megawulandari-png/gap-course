import Link from 'next/link';

export default function Sidebar(){
  return <aside className="sidebar">
    <div className="logoRow"><div className="logoBadge">G</div><div><strong>GAP Course</strong><span>Management</span></div></div>
    <nav>
      <Link href="/admin">Dashboard</Link>
      <Link href="/admin/students">Students</Link>
      <Link href="/admin/sessions">Sessions</Link>
      <Link href="/admin/reflections">Reflections</Link>
      <Link href="/admin/invoices">Invoices</Link>
    </nav>
    <form action="/api/admin-logout" method="post"><button className="btn ghost full">Log out</button></form>
  </aside>
}
