import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import DashboardLayout from '@/layouts/DashboardLayout'
import { Providers } from '@/utils/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Delman.io',
  description: 'Sales Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </Providers>
      </body>
    </html>
  )
}
