import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Infinite Scroll Feed',
    description: 'Infinite Scroll Feed',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" style={{ backgroundColor: '#44403b' }}>
            <body>{children}</body>
        </html>
    )
}
