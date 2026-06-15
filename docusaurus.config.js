import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Disfox Documentation',
  tagline: 'Disfox JS Documentation',
  favicon: 'img/dfx-fav.ico',

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'your-org',
  projectName: 'disfox-docs',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      
      logo: {
        alt: 'Disfox Logo',
        src: 'img/dfx-outline.png',
        href: '/',
      },
      
    },

    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Disfox`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;