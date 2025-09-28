import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-[2px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default: 'bg-primary shadow-xs hover:bg-primary/90',
                destructive:
                    'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20',
                outline:
                    'border bg-background shadow-xs hover:bg-stone-200 active:bg-stone-300',
                secondary:
                    'text-primary-foreground hover:bg-stone-500/60 active:bg-stone-500 focus-visible:ring-ring-light',
                ghost: 'hover:bg-stone-700 active:bg-stone-600 focus-visible:ring-ring-light',
                link: 'text-primary hover:bg-stone-200/40 active:bg-stone-300/70 focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            },
            size: {
                default: 'h-9 p-1 mx-1.5',
                sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
                lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
                icon: 'size-9',
                link: 'px-2 py-1 -mx-2 -my-1 underline text-small',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : 'button'

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
