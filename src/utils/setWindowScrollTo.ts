export const setWindowScrollTo = (
    offset: number,
    ref: React.RefObject<HTMLDivElement | HTMLQuoteElement | null>
) => {
    if (ref.current) {
        const top =
            ref.current.getBoundingClientRect().top + window.scrollY - offset

        window.scrollTo({ top, behavior: 'smooth' })
    }
}
