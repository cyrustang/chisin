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
    <html lang="en" className="h-full w-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      </head>
      <body className={`${inter.className} h-full w-full flex flex-col overflow-hidden`}>
        <header className="sticky top-0 z-10 w-full">
          {/* Top bar content */}
        </header>

        <main className="flex-grow overflow-auto w-full">
          {children}
        </main>

        <nav className="sticky bottom-0 z-10 w-full">
          {/* Bottom nav bar content */}
        </nav>
      </body>
    </html>
  )
}
