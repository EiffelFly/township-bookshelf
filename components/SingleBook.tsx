import { FC } from 'react';
import { Book } from '../type/type';
import Image from 'next/image';

interface Props {
	book: Book;
}

const SingleBook: FC<Props> = ({ book }) => {
	return (
		<div className="flex flex-col">
			<div className="flex mx-auto mb-4">
				<Image src={book.image} alt={book.title} width={128} height={192} />
			</div>
			<div className="max-w-[300px] text-center mx-auto font-sans font-semibold text-sdm-cg-100">
				{book.title}
			</div>
			{book.authors && (
				<div className="max-w-[300px] text-center mx-auto font-sans font-normal text-sdm-steel-blue-300">
					{book.authors[0]}
				</div>
			)}
		</div>
	);
};

export default SingleBook;
