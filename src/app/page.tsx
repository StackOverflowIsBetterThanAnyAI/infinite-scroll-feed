import Footer from '@/components/footer/Footer'
import Navigation from '@/components/navigation/Navigation'

export default function Home() {
    return (
        <div className="min-h-svh flex flex-col items-center justify-start bg-gradient-to-b from-stone-700 to-stone-800">
            <Navigation />
            <Footer />
        </div>
    )
}
