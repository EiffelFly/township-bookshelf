import { useEffect } from 'react';
import { handle } from '../utilities/utilities';
import { GetServerSideProps } from 'next';
import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const [error, result] = await handle(getBookByISBN({ isbn: 9789573284536 }));

	console.log(result.data.items);

	return {
		props: {
			error: {
				code: error.status,
				message: error,
			},
		},
	};
};


