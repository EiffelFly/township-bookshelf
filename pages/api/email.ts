import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail, generateEmailHtml } from '../../lib/email';

interface ReturnType {
  error?: {} | null
  result?: {} | null
}

const main = async (req: NextApiRequest, res: NextApiResponse<ReturnType>) => {
	try {
    const mailOptions = {
      from: `recommend-book@summerbud.org`,
      to: 'eric525282@gmail.com',
      subject: `Recommended by ${req.body.name}: ${req.body.title}`,
      html: generateEmailHtml(req.body.name, req.body.title, req.body.author, req.body.image, req.body.reason)
    };
    await sendEmail(mailOptions)
    return res.status(201).json({ result: "Success" });
  } catch (err) {
    console.log("mid", err)
    return res.status(500).json(err);
  }
};

export default main;
