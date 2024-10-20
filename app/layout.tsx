import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "每日日課",
  description: "Created by Cyrus Tang",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={`${inter.className} h-full flex flex-col`}>
        {/* Add your top bar here */}
        <header className="sticky top-0 z-10">
          {/* Top bar content */}
        </header>

        <main className="flex-grow overflow-auto">
          {children}
        </main>

        {/* Add your bottom nav bar here */}
        <nav className="sticky bottom-0 z-10">
          {/* Bottom nav bar content */}
        </nav>
      </body>
    </html>
  )
}
