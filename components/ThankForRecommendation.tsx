import { FC } from 'react';
import Link from 'next/link';

interface Props {}

const ThankForRecommendation: FC<Props> = () => {
	return (
		<>
			<div className="mx-auto text-center text-5xl">🎉</div>
			<div className="mx-auto text-center text-3xl font-semibold text-sdm-bronze-100 mb-8">
				Thank for your recommendation!!
			</div>
			<div className="flex flex-col md:flex-row mx-auto gap-y-8 md:gap-x-4">
				<Link
          href="/"
					passHref
        >
					<a className="text-lg px-8 py-1 bg-sdm-cg-800 font-semibold rounded-md text-sdm-cg-200 border border-opacity-0 border-sdm-bronze-700 hover:border-opacity-100 hover:text-sdm-bronze-700">
						Back to bookshelf
					</a>
				</Link>
				<a
					href={'https://www.summerbud.org'}
					className="text-lg px-8 py-1 bg-sdm-cg-800 font-semibold rounded-md text-sdm-cg-200 border border-opacity-0 border-sdm-bronze-700 hover:border-opacity-100 hover:text-sdm-bronze-700"
				>
					Go to blog
				</a>
			</div>
		</>
	);
};

export default ThankForRecommendation;
