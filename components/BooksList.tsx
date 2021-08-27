import { FC } from 'react';
import { Book } from '../type/type';
import Image from 'next/image';

interface Props {
	books: Book[];
	onSelectBook: (value: Book) => void;
}

const BooksList: FC<Props> = ({ books, onSelectBook }) => {
	const handleClick = (book: Book) => {
		onSelectBook(book);
	};

	return (
		<div className="font-sans grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
			{books.map((book, index) => (
				<button className="flex" key={index} onClick={() => handleClick(book)}>
					<div className="flex flex-col mb-auto mx-auto">
						{book.image ? (
							<div className="flex mx-auto mb-4">
								<Image
									src={book.image}
									alt={book.title}
									width={192}
									height={288}
								/>
							</div>
						) : (
							<div className="w-[192px] h-[288px] mb-4"></div>
						)}
						<div className="w-[192px] mx-auto text-left font-sans font-semibold text-sdm-cg-100">
							{book.title}
						</div>
						{book.authors && (
							<div className="w-[192px] mx-auto text-left font-sans font-normal text-sdm-steel-blue-300">
								{book.authors[0]}
							</div>
						)}
					</div>
				</button>
			))}
		</div>
	);
};

export default BooksList;
