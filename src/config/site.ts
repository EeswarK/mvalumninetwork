interface SiteConfig {
  name: string;
  description: string;
  links: {
    twitter: string;
    github: string;
    linkedin: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "mv-network",
  description: "mvn",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    linkedin: "https://www.linkedin.com/in/eeswar-kurli-8bb93b1a3/",
  },
};
