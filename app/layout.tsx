import Navbar from '@/components/navbar.component'
import { Inconsolata, Inter, Roboto } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Next.js Project',
  description: 'A Next.js project with TypeScript and TailwindCSS.',
  keywords: 'Next.js, TypeScript, TailwindCSS',
}

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
