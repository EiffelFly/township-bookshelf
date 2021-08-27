import { FC, useState, SyntheticEvent, ChangeEvent } from 'react';

interface Props {
	onChange: (value: string) => void;
}

const SearchBookForm: FC<Props> = ({ onChange }) => {
	const [searchTerm, setSearchTerm] = useState<string>();

	const onSubmit = (e: SyntheticEvent): void => {
		e.preventDefault();
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<form className="" onSubmit={onSubmit}>
			<div className="flex flex-row gap-x-4 border-b border-sdm-steel-blue-500 py-2">
				<div className="flex flex-row flex-1 mr-auto gap-x-2">
					<div className="font-sans font-semibold text-2xl text-sdm-cg-400">Book's title :</div>
					<input
						className="flex-1 bg-sdm-cg-900 focus:outline-none text-2xl text-sdm-cg-100"
						type="text"
						value={searchTerm}
						onChange={handleChange}
					/>
				</div>
        <div
          className="ml-auto"
        >
          <div
            className="px-2 py-1 border rounded-md border-sdm-cg-400 font-sans text-sdm-cg-400 text-sm"
          >
            enter
          </div>
        </div>
			</div>
		</form>
	);
};

export default SearchBookForm;
