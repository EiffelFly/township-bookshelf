import { useEffect } from 'react';
import { handle } from '../utilities/utilities';
import { GetServerSideProps } from 'next'
import axios from "axios"


interface Props {}

const bookshlves = [
  9789573284536
]

const Home: React.FC<Props> = () => {

	return <div>hi</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const [error, result] = await handle(getBookByISBN({isbn:9789573284536}));

  if (error){
    console.error(error)
  }

  console.log(result.data.items)

  return {
    props: {}
  }
}

const getBookByISBN = async ({ isbn }) => {
  const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
	try {
		const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    return Promise.resolve(res)
	} catch (err) {
		return Promise.reject(err);
	}
};



export default Home;
