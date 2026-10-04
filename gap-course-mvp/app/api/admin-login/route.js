import { NextResponse } from 'next/server';

export async function POST(request){
  const form = await request.formData();
  const password = String(form.get('password') || '');
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.redirect(new URL('/admin/login?error=1', request.url), 303);
  }
  const res = NextResponse.redirect(new URL('/admin', request.url), 303);
  res.cookies.set('gap_admin','1',{ httpOnly:true, sameSite:'lax', secure:process.env.NODE_ENV==='production', maxAge:60*60*24*14, path:'/' });
  return res;
}
