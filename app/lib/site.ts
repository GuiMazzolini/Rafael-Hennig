export const siteConfig = {
  name: 'Rafael Hennig',
  description:
    'Brazilian, Berlin-based photographer and filmmaker working across analog and digital media',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rafaelhennig.com',
};

export function getSocialLinks(): { label: string; href: string }[] {
  const links = [
    { label: 'Instagram', href: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
  ];

  return links.filter((link): link is { label: string; href: string } =>
    Boolean(link.href),
  );
}
