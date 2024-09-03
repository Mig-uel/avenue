import Navbar from '@/components/navbar.component'
import './globals.css'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <main className='max-w-3xl mx-auto py-10'>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
