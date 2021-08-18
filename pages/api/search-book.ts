import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface ReturnType {
  error: {} | null;
  result: {} | null;
}


const main = async (req: NextApiRequest, res: NextApiResponse<ReturnType>) => {
	switch (req.body.type) {
		case 'isbn': {

    
		}
		case 'author': {
			break;
		}
		case 'text': {
			break;
		}
		case 'quote': {
			break;
		}
	}
};

export default main;



