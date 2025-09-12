import { Button } from '@/components/ui/button'

type NavigationButtonProps = { handleScroll: () => void; label: string }

const NavigationButton = ({ handleScroll, label }: NavigationButtonProps) => {
    return (
        <Button asChild variant="ghost" className="px-2">
            <button
                className="text-large"
                aria-label={`Scroll to ${label}`}
                title={`Scroll to ${label}`}
                onClick={handleScroll}
            >
                {label}
            </button>
        </Button>
    )
}

export default NavigationButton
