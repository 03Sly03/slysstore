import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';
import Order from '../../../models/Orders';
import db from '../../../utils/db';

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }
  const { user } = session;
  console.log('le session user id: ', user._id);
  await db.connect();
  const newOrder = new Order({
    ...req.body,
    user: user._id,
  });
  const order = await newOrder.save();
  res.status(201).send(order);
};

export default handler;
