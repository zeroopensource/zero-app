'use client'
import { usePathname } from 'next/navigation'

export const AppsTabContent = () => {
  const pathname = usePathname()
  return (
    <div>
      <p>Current pathname: {pathname}</p>
    </div>
  )
}
