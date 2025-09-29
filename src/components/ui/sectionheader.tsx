type SectionHeaderProps = {
    className?: string
    children: string
}

export const SectionHeader = ({ className, children }: SectionHeaderProps) => {
    return (
        <h2
            className={`self-start text-very-large font-semibold underline ${className}`}
        >
            {children}
        </h2>
    )
}
