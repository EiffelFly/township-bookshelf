import { FC } from 'react';
import { Book } from '../type/type';
import Image from 'next/image';

interface Props {
	books: Book[];
}

const SearchingBooksList: FC<Props> = ({ books }) => {
	return (
		<div className="font-sans grid grid-cols-6 gap-8">
			{books.map((book) => (
				<div key={book.title}>
					<div className="flex flex-col">
						<div className="relative">
							<Image src={book.image} alt={book.title} width={128} height={192} />
						</div>
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

export default SearchingBooksList;
