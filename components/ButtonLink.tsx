import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonLinkProps = {
  href: string
  className?: string
  children: ReactNode
}

const ButtonLink = ({ href, className, children }: ButtonLinkProps) => {
  return (
    <Link href={href}>
      <a
        className={
          'px-4 py-2 rounded-custom bg-accent inline-block text-center ' +
          className
        }
      >
        {children}
      </a>
    </Link>
  )
}

export default ButtonLink
