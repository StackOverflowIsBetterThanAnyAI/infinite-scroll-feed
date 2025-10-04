'use client'

import Image from 'next/image'
import { faker } from '@faker-js/faker'
import logoipsum0 from '@/assets/logoipsum0.webp'
import logoipsum1 from '@/assets/logoipsum1.webp'
import logoipsum2 from '@/assets/logoipsum2.webp'
import logoipsum3 from '@/assets/logoipsum3.webp'
import logoipsum4 from '@/assets/logoipsum4.webp'
import logoipsum5 from '@/assets/logoipsum5.webp'
import logoipsum6 from '@/assets/logoipsum6.webp'
import logoipsum7 from '@/assets/logoipsum7.webp'
import logoipsum8 from '@/assets/logoipsum8.webp'
import logoipsum9 from '@/assets/logoipsum9.webp'
import logoipsum10 from '@/assets/logoipsum10.webp'
import logoipsum11 from '@/assets/logoipsum11.webp'
import logoipsum12 from '@/assets/logoipsum12.webp'
import logoipsum13 from '@/assets/logoipsum13.webp'
import logoipsum14 from '@/assets/logoipsum14.webp'
import logoipsum15 from '@/assets/logoipsum15.webp'
import { SectionHeader } from '@/components/ui/sectionheader'
import { useState, useEffect } from 'react'

const Partners = () => {
    const images = [
        logoipsum0,
        logoipsum1,
        logoipsum2,
        logoipsum3,
        logoipsum4,
        logoipsum5,
        logoipsum6,
        logoipsum7,
        logoipsum8,
        logoipsum9,
        logoipsum10,
        logoipsum11,
        logoipsum12,
        logoipsum13,
        logoipsum14,
        logoipsum15,
    ]

    const [partners, setPartners] = useState<{ name: string }[]>([])

    useEffect(() => {
        const generated = Array.from({ length: images.length }, () => ({
            name: faker.company.name(),
        }))
        setPartners([...generated, ...generated])
    }, [images.length])

    return (
        <section className="w-full max-w-7xl bg-stone-100 text-stone-950 my-6 lg:my-8 overflow-hidden">
            <SectionHeader className="p-2 sm:p-3 lg:p-6">
                Our Partners
            </SectionHeader>
            <div className="flex gap-6 lg:gap-10 pb-2 sm:pb-3 lg:pb-6 animate-scroll">
                {[...images, ...images].map((item, index) => {
                    return (
                        <div
                            className="w-fit min-w-8 sm:min-w-12 lg:min-w-16 self-center"
                            key={index}
                        >
                            <div className="h-8 sm:h-12 lg:h-16 flex items-center">
                                <Image
                                    src={item}
                                    alt={
                                        partners[index]?.name ||
                                        `Company ${index}`
                                    }
                                    title={
                                        partners[index]?.name ||
                                        `Company ${index}`
                                    }
                                    className="object-contain h-full w-auto saturate-0"
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Partners
