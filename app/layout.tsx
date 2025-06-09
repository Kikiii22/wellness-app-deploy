import type { Metadata } from 'next'
import './globals.css'
import Head from 'next/head'

export const metadata: Metadata = {
  title: 'Баланс',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
      <body>{children}</body>
    </html>
  );
}
