type Link = {
  name: string;
  url: string;
  description: string;
  icon?: string;
  disabled?: boolean;
  shieldsIoUrl?: string;
};

export const ZERO_SHIELDSIO_URL =
  "https://img.shields.io/badge/Zero-black.svg?logo=data:image/svg%2bxml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMjAwIDM2MEMyODguMzY2IDM2MCAzNjAgMjg4LjM2NiAzNjAgMjAwQzM2MCAxMTEuNjM0IDI4OC4zNjYgNDAgMjAwIDQwQzExMS42MzQgNDAgNDAgMTExLjYzNCA0MCAyMDBDNDAgMjg4LjM2NiAxMTEuNjM0IDM2MCAyMDAgMzYwWk0yMDAgMzEyQzI2MS44NTYgMzEyIDMxMiAyNjEuODU2IDMxMiAyMDBDMzEyIDEzOC4xNDQgMjYxLjg1NiA4OCAyMDAgODhDMTM4LjE0NCA4OCA4OCAxMzguMTQ0IDg4IDIwMEM4OCAyNjEuODU2IDEzOC4xNDQgMzEyIDIwMCAzMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K";

export const ZERO_OFFICIAL_LINKS: { [key: string]: Link } = {
  ZERO_WEBSITE: {
    name: "ZeroOpenSource.org",
    url: "https://zeroopensource.org/",
    description:
      "Official website of Zero Open Source - Explore our projects and mission",
    shieldsIoUrl: ZERO_SHIELDSIO_URL,
  },
  ZERO_OFFICIAL: {
    name: "Zero-Official",
    url: "https://github.com/zeroopensource/zero-official",
    description: "Official resources for Zero Open Source",
    shieldsIoUrl: ZERO_SHIELDSIO_URL,
  },
  ZERO_GITHUB: {
    name: "Github",
    url: "https://github.com/zeroopensource",
    description:
      "Browse our open source repositories and contribute to our projects",
    icon: "SiGithub",
  },
  ZERO_DISCORD: {
    name: "Discord",
    url: "https://discord.gg/2a5HcmxvgC",
    description:
      "Join our community Discord server for discussions and support",
    icon: "SiDiscord",
  },
  ZERO_XTWITTER: {
    name: "X (Twitter)",
    url: "https://x.com/ZeroOpenSource",
    description:
      "Follow us on X (Twitter) for the latest updates and announcements",
    icon: "SiX",
  },
  ZERO_FACEBOOK: {
    name: "Facebook",
    url: "https://www.facebook.com/ZeroOpenSource",
    description: "Connect with us on Facebook for community updates and events",
    icon: "SiFacebook",
  },
  ZERO_REDDIT: {
    name: "Reddit",
    url: "https://www.reddit.com/r/ZeroOpenSource",
    description:
      "Join our Reddit community for discussions and project updates",
    icon: "SiReddit",
  },
  ZERO_LINKEDIN: {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/zeroopensource",
    description:
      "Follow our professional network for industry insights and opportunities",
    icon: "SiLinkedin", // https://github.com/simple-icons/simple-icons/pull/11380, https://github.com/badges/shields/issues/10999
  },
  ZERO_BLUESKY: {
    name: "Bluesky",
    url: "https://bsky.app/profile/zeroopensource.bsky.social",
    description: "Connect with us on Bluesky for decentralized social updates",
    icon: "SiBluesky",
  },
  ZERO_MASTODON: {
    name: "Mastodon",
    url: "https://mastodon.social/@ZeroOpenSource",
    description: "Follow us on Mastodon for federated social updates",
    icon: "SiMastodon",
  },
  ZERO_MEDIUM: {
    name: "Medium",
    url: "https://medium.com/@zeroopensource",
    description: "Read our in-depth articles and technical blog posts",
    icon: "SiMedium",
  },
  ZERO_DEVTO: {
    name: "Dev.to",
    url: "https://dev.to/zeroopensource",
    description: "Follow our developer-focused content and tutorials",
    icon: "SiDevdotto",
  },
  ZERO_DAILYDEV: {
    name: "Daily.dev",
    url: "https://app.daily.dev/zeroopensource",
    description: "Check out our curated content for developers",
    icon: "SiDailydotdev",
  },
  ZERO_HASHNODE: {
    name: "Hashnode",
    url: "https://zeroopensource.hashnode.dev/",
    description: "Read our technical blog posts and community articles",
    icon: "SiHashnode",
  },
  ZERO_PRODUCTHUNT: {
    name: "Product Hunt",
    url: "https://www.producthunt.com/@zeroopensource",
    description: "Discover and upvote our latest launches and projects",
    icon: "SiProducthunt",
  },
  ZERO_PATREON: {
    name: "Patreon",
    url: "https://www.patreon.com/c/ZeroOpenSource",
    description: "Support our open source work through Patreon",
    icon: "SiPatreon",
  },
  ZERO_HUGGINGFACE: {
    name: "Hugging Face",
    url: "https://huggingface.co/ZeroOpenSource",
    description: "Explore our AI models and datasets on Hugging Face",
    icon: "SiHuggingface",
  },
  ZERO_YOUTUBE: {
    name: "Youtube",
    url: "https://www.youtube.com/@ZeroOpenSource",
    description: "Watch our tutorials, project demos, and community highlights",
    icon: "SiYoutube",
  },

  ZERO_GITHUBSPONSORS: {
    name: "Github Sponsors",
    url: "https://github.com/sponsors/zeroopensource",
    description: "Show your support by sponsoring us on GitHub",
    icon: "SiGithub",
  },
  ZERO_BMC: {
    name: "Buy Me a Coffee",
    url: "https://buymeacoffee.com/zeroopensource",
    description: "Show your support by buying us a coffee",
    icon: "SiBuymeacoffee",
  },
  // ZERO_LINKTREE: {
  //   url: 'https://linktr.ee/zeroopensource',
  //   description: 'Find all our important links and resources in one place',
  //   icon: 'SiLinktree',
  //   disabled: true, // Duplicates our official links
  // },
  // ZERO_KOFI: {
  //   url: 'https://ko-fi.com/zeroopensource',
  //   description: 'Support our projects through Ko-fi monthly or one-time donations',
  //   icon: 'SiKofi',
  //   disabled: true, // Unable to connect to stripe
  // },
};
