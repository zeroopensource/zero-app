'use client'
import Link from 'next/link'
import {
  AppLayoutV2,
  IconV2,
  Header,
  Footer,
  SupportCard,
  Button,
  Menu,
  ZeroLogo,
  ZERO_LINKS,
  GradientButton,
} from '@zero-company/zero-lib-react'
import {
  LuList,
  LuHome,
  LuLayoutGrid,
  LuSettings,
  LuUserCircle2,
  LuSearch,
  LuBookOpen,
  LuInfo,
} from 'react-icons/lu'
import { FaFacebookF, FaGithub, FaTwitter, FaGlobe } from 'react-icons/fa6'
import { GlobalSidebarTabs } from '@/components'

type Props = {
  children: React.ReactNode
}

const SocialLinks = () => (
  <>
    <div className='flex p-2 gap-2'>
      <Link href={ZERO_LINKS.buymeacoffee} className='flex-1' target='_blank'>
        <GradientButton className='w-full'>Support Zero</GradientButton>
      </Link>
      <Link href={ZERO_LINKS.discord} className='flex-1' target='_blank'>
        <GradientButton gradient='purple2' className='w-full'>
          Join Community
        </GradientButton>
      </Link>
    </div>
    <div className='h-8 divide-x flex *:flex *:flex-1 *:justify-center *:h-full *:p-2'>
      <Link href={ZERO_LINKS.website} className='flex-1' target='_blank'>
        <IconV2 size='sm' reactIcon={<FaGlobe />} />
      </Link>
      <Link href={ZERO_LINKS.github} className='flex-1' target='_blank'>
        <IconV2 size='sm' reactIcon={<FaGithub />} />
      </Link>
      <Link href={ZERO_LINKS.twitter} className='flex-1' target='_blank'>
        <IconV2 size='sm' reactIcon={<FaTwitter />} />
      </Link>
      <Link href={ZERO_LINKS.facebook} className='flex-1' target='_blank'>
        <IconV2 size='sm' reactIcon={<FaFacebookF />} />
      </Link>
    </div>
  </>
)

export default function Layout({ children }: Props) {
  return (
    <>
      <AppLayoutV2
        body={children}
        header={<Header />}
        sidebar={
          <>
            <Menu
              options={[
                {
                  children: 'Index',
                  icon: <LuHome />,
                  href: '/zero',
                },
                {
                  children: 'Docs',
                  icon: <LuBookOpen />,
                  href: '/docs',
                },
                {
                  children: 'Advanced Search',
                  icon: <LuSearch />,
                  href: '/advanced-search',
                },
                {
                  children: 'App',
                  icon: <LuList />,
                  href: '/zero/about-app',
                },
              ]}
            />
            <Menu
              options={[
                {
                  children: 'Apps',
                  icon: <LuLayoutGrid />,
                  href: '/apps',
                  disabled: true,
                },
                {
                  children: 'User',
                  icon: <LuUserCircle2 />,
                  href: '/user',
                  disabled: true,
                },
                {
                  children: 'Settings',
                  icon: <LuSettings />,
                  href: '/settings',
                  disabled: true,
                },
                {
                  children: 'About',
                  icon: <LuInfo />,
                  href: '/zero/about',
                  disabled: true,
                },
              ]}
            />
          </>
        }
        footer={
          <>
            <SocialLinks />
            <Footer />
          </>
        }
      />
    </>
  )
}
