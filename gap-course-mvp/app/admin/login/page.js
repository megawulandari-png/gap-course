export default async function Login({ searchParams }){
  const params = await searchParams;
  return <main className="loginShell">
    <div className="loginCard">
      <div className="brandMark">GAP</div>
      <h1>Admin Login</h1>
      <p>GAP Course Management</p>
      {params?.error && <div className="alert error">Password salah.</div>}
      <form action="/api/admin-login" method="post" className="stack">
        <label>Password admin</label>
        <input type="password" name="password" placeholder="Enter password" required />
        <button className="btn primary">Login</button>
      </form>
      <small>Password disimpan di Vercel Environment Variables, bukan di kode.</small>
    </div>
  </main>
}
