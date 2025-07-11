import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import slugify from '@sindresorhus/slugify'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <Link
        href={`#${slugify(children?.toString() || '')}`}
        className='underline underline-offset-4 hover:text-primary'
      >
        <h2 id={slugify(children?.toString() || '')}>{children}</h2>
      </Link>
    ),
    ...components,
  }
}
