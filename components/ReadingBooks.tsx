import { FC } from 'react';
import { Book } from '../type/type';
import Image from 'next/image'


interface Props {
	books: Book[];
}

const ReadingBooks: FC<Props> = ({ books }) => {
	return (
		<div className="flex flex-col gap-y-4">
			{books.map((book) => (
				<div key={book.title} className="flex flex-row md:min-w-[768px] font-sans border border-sdm-bronze-500 p-8 rounded-lg">
					<div className="flex flex-col mr-auto gap-y-2">
						<div className="font-semibold text-sdm-cg-100 text-3xl">{book.title}</div>
						<div className="font-normal text-sdm-cg-300 text-base ">{book.subtitle}</div>
						<div className="font-normal text-sdm-cg-400 text-base max-w-md">{book.description}</div>
					</div>
          <div
            className="relative ml-auto"
          >
            <Image src={book.image} alt={book.title} width={128} height={192} />
          </div>
				</div>
			))}
		</div>
	);
};

export default ReadingBooks;
