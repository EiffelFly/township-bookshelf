import { FC } from 'react';
import { Book } from '../type/type';
import Image from 'next/image';

interface Props {
	books: Book[];
}

const BooksList: FC<Props> = ({ books }) => {
	return (
		<div className="font-sans grid grid-cols-4 gap-8">
			{books.map((book, index) => (
				<div key={index}>
					<div className="flex flex-col">
						{ book.image ? (<div className="relative">
							<Image src={book.image} alt={book.title} width={128} height={192} />
						</div>) : (<div className="w-[128px] h-[192px]"></div>)}
						
            <div>
              {book.title}
            </div>
            <div>
              {book.authors[0]}
            </div>
					</div>
				</div>
			))}
		</div>
	);
};

export default BooksList;
