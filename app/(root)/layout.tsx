import Topbar from '@/components/shared/Topbar'
import { ClerkProvider } from '@clerk/nextjs'
import "../globals.css";
import "../../styles.css";
import { Open_Sans} from "next/font/google"
export const metadata = {
  title: 'H3 Templates',
  
}

const open = Open_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

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
          <div className={open.className}>
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