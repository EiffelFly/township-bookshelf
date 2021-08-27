import { FC, useEffect, useState } from 'react';
import { PageRootLayout } from '../components/PageRootLayou';
import RecommendMeABookTitle from '../components/RecommendMeABookTitle';
import SearchBookForm from '../components/SearchBookForm';
import SectionContainer from '../components/SectionContainer';
import { getBookByTitle } from '../lib/google-book-api';
import { handle } from '../lib/utilities';

interface Props {}

const Page: FC<Props> = () => {
	const [searchTerm, setSearchTerm] = useState<string>();
	const [isSearching, setIsSearching] = useState<boolean>();

	const handlerSearchTermChange = (value: string) => {
		setSearchTerm(value);
	};

	useEffect(() => {
		if ( searchTerm && searchTerm.length < 4 ) return;
		setIsSearching(true);

		getBookByTitle(searchTerm)

	}, [searchTerm])

	return (
		<div className="flex flex-col">
      <PageRootLayout>
        <SectionContainer className={"gap-y-4"}>
          <RecommendMeABookTitle />
          <SearchBookForm onChange={handlerSearchTermChange} />
        </SectionContainer>
      </PageRootLayout>
		</div>
	);
};

export default Page;
