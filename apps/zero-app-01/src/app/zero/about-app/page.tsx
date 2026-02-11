'use client'
import AboutApp from './about-app.mdx'
import { Markdown } from '@zero-company/zero-lib-react'

export default function Page() {
  return (
    <>
      <Markdown>{<AboutApp />}</Markdown>
    </>
  )
}
