import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TopBar } from './components/top-bar';

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "每日日課",
  description: "Created by Cyrus Tang",
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  )
}
