import { PageRootLayout } from '../components/PageRootLayou';
import SectionContainer from '../components/SectionContainer';
import { GetStaticProps } from 'next';
import bookList from '../book-list';
import { getBookByISBN } from '../lib/google-book-api';
import { handle } from '../lib/utilities';
import axios from 'axios';
import { InferGetStaticPropsType } from 'next';

interface Props {}

const Home: React.FC<Props> = ({ books }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<PageRootLayout>
			<SectionContainer>

      </SectionContainer>
		</PageRootLayout>
	);
};

interface Book {
	title: string;
	subtitle: string;
	authors: string;
	publishedDate: string;
	publisher: string;
	description: string;
	language: string;
	pageCount: number;
	image: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
	let readingBookList: Book[] = [];
	const readingBooks = bookList.reading;

	for (let i = 0; i < readingBooks.length; i++) {
		const [error, result] = await handle(getBookByISBN({ isbn: readingBooks[i].isbn }));
		if (error || result.data.items.length > 1) {
			continue;
		}

		const [fullQueryError, fullQueryResult] = await handle(getBookBySelfLink(result.data.items[0].selfLink));

		if (fullQueryError) {
			continue;
		}

		readingBookList.push({
			title: fullQueryResult.data.volumeInfo.title,
			subtitle: fullQueryResult.data.volumeInfo.subtitle,
			authors: fullQueryResult.data.volumeInfo.authors,
			publishedDate: fullQueryResult.data.volumeInfo.publishedDate,
			publisher: fullQueryResult.data.volumeInfo.publisher,
			description: fullQueryResult.data.volumeInfo.description,
			language: fullQueryResult.data.volumeInfo.language,
			pageCount: fullQueryResult.data.volumeInfo.pageCount,
			image: fullQueryResult.data.volumeInfo.imageLinks.thumbnail,
		});
	}

	return {
		props: {
			books: readingBookList,
		},
	};
};

export default Home;

const getBookBySelfLink = async (selfLink: string) => {
	try {
		const res = await axios.get(selfLink);
		return Promise.resolve(res);
	} catch (err) {
		return Promise.reject(err);
	}
};
