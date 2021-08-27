import { FC, useEffect, useState } from 'react';
import { PageRootLayout } from '../components/PageRootLayou';
import RecommendMeABookTitle from '../components/RecommendMeABookTitle';
import SearchBookForm from '../components/SearchBookForm';
import BooksList from '../components/BooksList';
import SectionContainer from '../components/SectionContainer';
import { getBookByTitle } from '../lib/google-book-api';
import { handle } from '../lib/utilities';
import LoadingSpin from '../components/LoadingSpin';

interface Props {}

const Page: FC<Props> = () => {
	const [searchTerm, setSearchTerm] = useState<string>();
	const [isSearching, setIsSearching] = useState<boolean>();
	const [searchedBooks, setSearchedBooks] = useState([]);

	const handlerSearchTermChange = (value: string) => {
		setSearchTerm(value);
	};

	useEffect(() => {
		const handleEnterKeydown = async (event: KeyboardEvent) => {
			if (!searchTerm) return;
			if (searchTerm.length < 4) return;

			if (event.code === 'Enter' || event.code === 'NumpadEnter') {
				event.preventDefault();
				setIsSearching(true);
				const [error, result] = await handle(getBookByTitle(searchTerm));
				if (error) {
					console.error(error);
					return;
				}

				let books = [];

				for (const item of result.data.items) {
					let image = null;
					if ( item.volumeInfo.imageLinks ){
						image = item.volumeInfo.imageLinks.thumbnail
					}
					books.push({
						title: item.volumeInfo.title,
						subtitle: item.volumeInfo.subtitle || '',
						authors: item.volumeInfo.authors,
						publishedDate: item.volumeInfo.publishedDate,
						publisher: item.volumeInfo.publisher,
						description: item.volumeInfo.description,
						language: item.volumeInfo.language,
						pageCount: item.volumeInfo.pageCount,
						image: image,
					});
				}

				setSearchedBooks(books);
				setIsSearching(false);
				console.log(result);
			}
		};
		document.addEventListener('keydown', handleEnterKeydown);
		return () => {
			document.removeEventListener('keydown', handleEnterKeydown);
		};
	}, [searchTerm]);

	return (
		<div className="flex flex-col">
			<PageRootLayout>
				<SectionContainer className={'gap-y-4'}>
					<RecommendMeABookTitle />
					<SearchBookForm onChange={handlerSearchTermChange} />
					{isSearching ? <LoadingSpin className={'w-6 h-6'} /> : <BooksList books={searchedBooks} />}
				</SectionContainer>
			</PageRootLayout>
		</div>
	);
};

export default Page;
