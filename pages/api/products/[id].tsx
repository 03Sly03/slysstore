import { NextApiHandler } from 'next';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const Handler: NextApiHandler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};

export default Handler;
