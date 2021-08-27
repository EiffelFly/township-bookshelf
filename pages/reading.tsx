import { PageRootLayout } from '../components/PageRootLayou';
import SectionContainer from '../components/SectionContainer';
import { GetStaticProps } from 'next';
import bookList from '../book-list';
import { getBookByISBN } from '../lib/google-book-api';
import { handle, truncateString } from '../lib/utilities';
import axios from 'axios';
import { InferGetStaticPropsType } from 'next';
import ReadingBooks from '../components/ReadingBooks';
import { Book } from "../type/type"

interface Props {}

const Reading: React.FC<Props> = ({ books }: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<PageRootLayout>
			<SectionContainer className={"gap-y-4"}>
        <ReadingBooks books={books} />
      </SectionContainer>
		</PageRootLayout>
	);
};



export const getStaticProps: GetStaticProps = async (context) => {
	let readingBookList: Book[] = [];
	const readingBooks = bookList.reading;

	for (let i = 0; i < readingBooks.length; i++) {
		const [error, result] = await handle(getBookByISBN(readingBooks[i].isbn));
		if (error || result.data.items.length > 1) {
			continue;
		}
		const [fullQueryError, fullQueryResult] = await handle(getBookBySelfLink(result.data.items[0].selfLink));

		if (fullQueryError) {
			continue;
		}

    let truncateDescription: string;

    if ( fullQueryResult.data.volumeInfo.language === "en" ){
      truncateDescription = truncateString(fullQueryResult.data.volumeInfo.description, 200)
    } else {
      truncateDescription = truncateString(fullQueryResult.data.volumeInfo.description, 100)
    }

    
		readingBookList.push({
			title: fullQueryResult.data.volumeInfo.title,
			subtitle: fullQueryResult.data.volumeInfo.subtitle || "",
			authors: fullQueryResult.data.volumeInfo.authors,
			publishedDate: fullQueryResult.data.volumeInfo.publishedDate,
			publisher: fullQueryResult.data.volumeInfo.publisher,
			description: truncateDescription,
			language: fullQueryResult.data.volumeInfo.language,
			pageCount: fullQueryResult.data.volumeInfo.pageCount,
			image: fullQueryResult.data.volumeInfo.imageLinks.thumbnail,
		});
	}

  console.log(readingBookList)

	return {
		props: {
			books: readingBookList,
		},
	};
};

export default Reading;

const getBookBySelfLink = async (selfLink: string) => {
	try {
		const res = await axios.get(selfLink);
		return Promise.resolve(res);
	} catch (err) {
		return Promise.reject(err);
	}
};
