import './globals.css';

export const metadata = {
  title: 'GAP Course Management',
  description: 'Attendance, reflections, reports and invoices for GAP Course',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
