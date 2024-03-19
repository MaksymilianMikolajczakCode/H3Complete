import Topbar from '@/components/shared/Topbar'
import { ClerkProvider } from '@clerk/nextjs'
import "../globals.css";
export const metadata = {
  title: 'H3 Templates',
  
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        {/* <head>
        <link rel="icon" href="/favicon.ico" />
        </head> */}
        <body>
          <div className='w-full'>
          <Topbar/>
          </div>

          <main>
            <section>
              <div className='w-full stick2'>
                {children}
              </div>
            </section>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}