import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs'


import { Inter } from 'next/font/google'


import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next Form - Drag & Drop Form Builder'
}

import { ThemeProvider } from "@/components/providers/theme-providers";
import { Toaster } from '@/components/ui/toaster';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
   <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster/>
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  )
}
