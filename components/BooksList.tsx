import { FC } from 'react';
import { Book } from '../type/type';
import Image from 'next/image';

interface Props {
	books: Book[];
}

const BooksList: FC<Props> = ({ books }) => {
	return (
		<div className="font-sans grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
			{books.map((book, index) => (
				<div key={index}>
					<div className="flex flex-col">
						{ book.image ? (<div className="relative mx-auto mb-4">
							<Image src={book.image} alt={book.title} width={192} height={288} />
						</div>) : (<div className="w-[128px] h-[192px]"></div>)}
            <div
							className="w-[192px] mx-auto font-sans font-semibold text-sdm-cg-100"
						>
              {book.title}
            </div>
            <div className="w-[192px] mx-auto font-sans font-normal text-sdm-steel-blue-300">
              {book.authors[0]}
            </div>
					</div>
				</div>
			))}
		</div>
	);
};

export default BooksList;
