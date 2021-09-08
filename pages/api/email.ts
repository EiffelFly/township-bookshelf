import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '../../lib/email';

interface ReturnType {
  error?: {} | null
  result?: {} | null
}

const main = async (req: NextApiRequest, res: NextApiResponse<ReturnType>) => {
	try {
    const testMailOption = {
      from: `recommend-book@summerbud.org`,
      to: 'eric525282@gmail.com',
      subject: `Recommended by ${req.body.name}: ${req.body.title}`,
      html: `${req.body.reason}`,
    };
    await sendEmail(testMailOption)
    return res.status(201).json({ result: "Success" });
  } catch (err) {
    console.log("mid", err)
    return res.status(500).json(err);
  }
};

export default main;
