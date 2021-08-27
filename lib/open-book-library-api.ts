import axios from 'axios';

export const getLargeBookCoverByIsbn = async (isbn: string) => {
	try {
		const res = await axios.get(`http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`);
		return Promise.resolve(res);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const getLargeBookCoverUrlByIsbn = (isbn: string) => {
	return `http://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
};
