type SectionHeaderProps = {
    children: string
    light?: boolean
}

export const SectionHeader = ({
    children,
    light = false,
}: SectionHeaderProps) => {
    return (
        <h2
            className={`self-start text-very-large font-semibold underline ${
                light ? 'text-zinc-50' : ''
            }`}
        >
            {children}
        </h2>
    )
}
