import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
};

export default handler;
