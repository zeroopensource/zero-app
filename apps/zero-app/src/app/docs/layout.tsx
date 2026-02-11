'use client'
import {
  AppLayoutV2,
  IconV2,
  Header,
  Footer,
  SupportCard,
  Button,
  Menu,
} from '@zero-company/zero-lib-react'
import {
  LuList,
  LuLayoutGrid,
  LuSettings,
  LuSearch,
} from 'react-icons/lu'
import { GlobalSidebarTabs } from '@/components'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <AppLayoutV2
        body={children}
        header={<Header />}
        sidebar={
          <>
            <div className='flex flex-col items-start p-1 *:w-full'>
              <Button
                size='sm'
                className='text-xs gap-2 justify-start h-8 px-2'
                variant='ghost'
              >
                <IconV2 reactIcon={<LuSearch />} size='sm' /> Browse
              </Button>
              <Button
                size='sm'
                className='text-xs gap-2 justify-start h-8 px-2'
                variant='ghost'
              >
                <IconV2 reactIcon={<LuList />} size='sm' /> Outline
              </Button>
            </div>
          </>
        }
        footer={
          <>
            <SupportCard />
            <Footer />
          </>
        }
      />
    </>
  )
}
