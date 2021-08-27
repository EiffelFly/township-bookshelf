import { FC, useEffect, useState } from 'react';
import { PageRootLayout } from '../components/PageRootLayou';
import RecommendMeABookTitle from '../components/RecommendMeABookTitle';
import SearchBookForm from '../components/SearchBookForm';
import BooksList from '../components/BooksList';
import SectionContainer from '../components/SectionContainer';
import { getBookByTitle } from '../lib/google-book-api';
import { handle } from '../lib/utilities';
import LoadingSpin from '../components/LoadingSpin';
import { Book, updateProp } from '../type/type';
import SingleBook from '../components/SingleBook';
import RecommendReasonForm from '../components/RecommendReasonForm';
import ThankForRecommendation from '../components/ThankForRecommendation';

interface Props {}

const Page: FC<Props> = () => {
	const [searchTerm, setSearchTerm] = useState<string>();
	const [isSearching, setIsSearching] = useState<boolean>();
	const [searchedBooks, setSearchedBooks] = useState([]);
	const [selectedBook, setSelectedBook] = useState<Book>();
	const [stage, setStage] = useState<number>(0);

	const handlerSearchTermChange = (value: string) => {
		setSearchTerm(value);
	};

	const handleSelectedBook = (value: Book) => {
		setSelectedBook(value);
		setStage(stage + 1);
	};

	const handleUpdate = (value: updateProp) => {
		if (value.status) {
			console.log('send email');
			setStage(stage + 1);
			return;
		}

		setStage(stage - 1);
		setSelectedBook(null);
	};

	useEffect(() => {
		const handleEnterKeydown = async (event: KeyboardEvent) => {
			if (!searchTerm) return;

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
					if (item.volumeInfo.imageLinks) {
						image = item.volumeInfo.imageLinks.thumbnail;
					}

					// if (item.volumeInfo.industryIdentifiers) {
					// 	const isbnIndex = item.volumeInfo.industryIdentifiers.findIndex((e) => e.type === 'ISBN_13');
					// 	if (isbnIndex !== -1) {
					// 		const isbn = item.volumeInfo.industryIdentifiers[isbnIndex].identifier;
					// 		console.log(isbn);
					// 		const [, getOpenLibCoverResult] = await handle(getLargeBookCoverByIsbn(isbn));
					// 		if (getOpenLibCoverResult.status === 200) {
					// 			console.log(getOpenLibCoverResult)
					// 			image = getLargeBookCoverUrlByIsbn(isbn);
					// 		}
					// 	}
					// }

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

	const componentSwitch = () => {
		switch (stage) {
			case 0: {
				return (
					<PageRootLayout>
						<SectionContainer className={'gap-y-8'}>
							<RecommendMeABookTitle />
							<SearchBookForm onChange={handlerSearchTermChange} />
							{isSearching ? (
								<LoadingSpin className={'w-6 h-6 text-sdm-cg-100'} />
							) : (
								<BooksList
									books={searchedBooks}
									onSelectBook={handleSelectedBook}
								/>
							)}
						</SectionContainer>
					</PageRootLayout>
				);
			}
			case 1: {
				return (
					<PageRootLayout>
						<SectionContainer className={'gap-y-8'}>
							<SingleBook book={selectedBook} />
							<RecommendReasonForm onUpdate={handleUpdate} />
						</SectionContainer>
					</PageRootLayout>
				);
			}
			case 2: {
				return (
					<PageRootLayout>
						<SectionContainer className={'gap-y-8 my-auto'}>
							<ThankForRecommendation />
						</SectionContainer>
					</PageRootLayout>
				);
			}
		}
	};

	return <div className="flex flex-row">{componentSwitch()}</div>;
};

export default Page;
