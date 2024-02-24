import '@/styles/globals.css'
export default function DashboardLayout({
  children
}) {
  return (
    <html lang="en">
    <body>
    <section>{children}</section>
    </body>    
    </html>
  );
}
