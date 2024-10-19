import dynamic from 'next/dynamic'

const OpusDeiComponent = dynamic(() => import('@/components/opus-dei'), {
  ssr: false
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <OpusDeiComponent />
    </main>
  )
}


