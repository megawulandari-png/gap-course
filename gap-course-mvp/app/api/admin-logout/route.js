import { NextResponse } from 'next/server';
export async function POST(request){
  const res = NextResponse.redirect(new URL('/admin/login', request.url), 303);
  res.cookies.set('gap_admin','',{ httpOnly:true, maxAge:0, path:'/' });
  return res;
}
