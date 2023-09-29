import Topbar from '@/components/shared/Topbar'
import { ClerkProvider } from '@clerk/nextjs'
import "../globals.css";
export const metadata = {
  title: 'Next.js 13 with Clerk',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Topbar/>

          <main>
            <section className='main-container'>
              <div className='w-full'>
                {children}
              </div>
            </section>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}