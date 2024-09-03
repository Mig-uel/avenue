import Navbar from '@/components/navbar.component'
import { Inconsolata, Inter, Roboto } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
})

// const inconsolata = Inconsolata({
//   subsets: ['latin'],
// })

// const roboto = Roboto({
//   subsets: ['latin'],
//   weight: ['400'],
// })

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        <main className='max-w-3xl mx-auto py-10'>{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
