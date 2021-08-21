import { FC, useState } from 'react';
import { PageRootLayout } from '../components/PageRootLayou';
import RecommendMeABookTitle from '../components/RecommendMeABookTitle';
import SearchBookForm from '../components/SearchBookForm';
import SectionContainer from '../components/SectionContainer';

interface Props {}

const Page: FC<Props> = () => {
	const [searchTerm, setSearchTerm] = useState<string>();
	const handlerSearchTermChange = (value: string) => {
		setSearchTerm(value);
	};

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
