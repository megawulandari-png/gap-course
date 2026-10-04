import Sidebar from './Sidebar';
export default function AdminShell({title,subtitle,children}){
  return <div className="appShell"><Sidebar/><main className="main"><header className="pageHead"><div><h1>{title}</h1><p>{subtitle}</p></div></header>{children}</main></div>
}
