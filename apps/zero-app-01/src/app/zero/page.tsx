'use client'
import Link from 'next/link'
import { LuSearch } from 'react-icons/lu'
import { Input } from '@zero-company/zero-lib-react'

export default function Home() {
  return (
    <div className='p-2'>
      <form>
        <div className='relative'>
          <LuSearch className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search'
            className='pl-8 h-9 !ring-0 !ring-offset-0'
          />
        </div>
      </form>
    </div>
  )
}
