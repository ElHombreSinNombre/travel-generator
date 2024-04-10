'use client'
import '@/assets/globals.scss'
import Head from 'next/head'

export const metadata = {
  title: 'Travel planner',
  description: 'Basic IA travel planner'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <title>Travel planner</title>
        <link rel='icon' type='image/icon' href='/favicon.ico' />
      </Head>
      <html lang='es'>
        <body>
          <main>{children}</main>
        </body>
      </html>
    </>
  )
}
