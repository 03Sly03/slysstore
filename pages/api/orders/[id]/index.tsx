import { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';
import Order from '../../../../models/Orders';
import db from '../../../../utils/db';

const Handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send('signin required');
  }
  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();
  res.send(order);
};

export default Handler;
