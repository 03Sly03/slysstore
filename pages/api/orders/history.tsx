import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';
import Order from '../../../models/Orders';
import db from '../../../utils/db';

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: 'signin required' });
  }
  const { user } = session;
  await db.connect();
  const orders = await Order.find({ user: user._id });
  await db.disconnect();
  res.send(orders);
};

export default handler;
