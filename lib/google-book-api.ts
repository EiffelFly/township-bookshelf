import axios from "axios"

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const getBookByISBN = async ( isbn: string ) => {
	try {
		const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
		return Promise.resolve(res);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const getBookByTitle = async ( title: string ) => {
	try {
		const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`);
		return Promise.resolve(res);
	} catch (err) {
		return Promise.reject(err);
	}
}