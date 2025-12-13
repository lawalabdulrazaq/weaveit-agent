import localFont from 'next/font/local';

export const polySans = localFont({
  src: [
    {
      path: './fonts/polysanstrial-neutral.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/polysanstrial-bulky.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-poly-sans',
  display: 'swap',
});
