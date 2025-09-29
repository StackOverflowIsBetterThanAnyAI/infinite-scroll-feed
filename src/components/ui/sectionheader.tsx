type SectionHeaderProps = {
    children: string
}

export const SectionHeader = ({ children }: SectionHeaderProps) => {
    return (
        <h2 className="self-start text-very-large font-semibold underline">
            {children}
        </h2>
    )
}
