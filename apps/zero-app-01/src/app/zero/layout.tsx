"use client";
import {
  AppLayoutV2,
  Footer,
  GradientButton,
  Header,
  IconV2,
  Menu,
  ZERO_LINKS,
} from "@zero-company/zero-lib-react";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaGlobe, FaTwitter } from "react-icons/fa6";
import {
  LuBookOpen,
  // LuHome,
  LuInfo,
  LuLayoutGrid,
  LuList,
  LuSearch,
  LuSettings,
  // LuUserCircle2,
} from "react-icons/lu";

type Props = {
  children: React.ReactNode;
};

const SocialLinks = () => (
  <>
    <div className="flex gap-2 p-2">
      <Link className="flex-1" href={ZERO_LINKS.buymeacoffee} target="_blank">
        <GradientButton className="w-full">Support Zero</GradientButton>
      </Link>
      <Link className="flex-1" href={ZERO_LINKS.discord} target="_blank">
        <GradientButton className="w-full" gradient="purple2">
          Join Community
        </GradientButton>
      </Link>
    </div>
    <div className="flex h-8 divide-x *:flex *:h-full *:flex-1 *:justify-center *:p-2">
      <Link className="flex-1" href={ZERO_LINKS.website} target="_blank">
        <IconV2 reactIcon={<FaGlobe />} size="sm" />
      </Link>
      <Link className="flex-1" href={ZERO_LINKS.github} target="_blank">
        <IconV2 reactIcon={<FaGithub />} size="sm" />
      </Link>
      <Link className="flex-1" href={ZERO_LINKS.twitter} target="_blank">
        <IconV2 reactIcon={<FaTwitter />} size="sm" />
      </Link>
      <Link className="flex-1" href={ZERO_LINKS.facebook} target="_blank">
        <IconV2 reactIcon={<FaFacebookF />} size="sm" />
      </Link>
    </div>
  </>
);

export default function Layout({ children }: Props) {
  return (
    <>
      <AppLayoutV2
        body={children}
        footer={
          <>
            <SocialLinks />
            <Footer />
          </>
        }
        header={<Header />}
        sidebar={
          <>
            <Menu
              options={[
                {
                  children: "Index",
                  icon: <LuSearch />,
                  href: "/zero",
                },
                {
                  children: "Docs",
                  icon: <LuBookOpen />,
                  href: "/docs",
                },
                {
                  children: "Advanced Search",
                  icon: <LuSearch />,
                  href: "/advanced-search",
                },
                {
                  children: "App",
                  icon: <LuList />,
                  href: "/zero/about-app",
                },
              ]}
            />
            <Menu
              options={[
                {
                  children: "Apps",
                  icon: <LuLayoutGrid />,
                  href: "/apps",
                  disabled: true,
                },
                {
                  children: "User",
                  icon: <LuSearch />,
                  href: "/user",
                  disabled: true,
                },
                {
                  children: "Settings",
                  icon: <LuSettings />,
                  href: "/settings",
                  disabled: true,
                },
                {
                  children: "About",
                  icon: <LuInfo />,
                  href: "/zero/about",
                  disabled: true,
                },
              ]}
            />
          </>
        }
      />
    </>
  );
}
