import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const pages = [
    {
      path: '/',
      title: 'Home',
    },
    {
      path: '/about',
      title: 'About',
    },
  ];

  res.json(pages);
}