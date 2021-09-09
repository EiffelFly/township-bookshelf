import { FC, SyntheticEvent, useState, ChangeEvent } from 'react';
import { updateProp } from '../type/type';

interface Props {
	onUpdate: (value: updateProp) => void;
}

const RecommendReasonForm: FC<Props> = ({ onUpdate }) => {
	const [name, setName] = useState<string>();
	const [reason, setReason] = useState<string>();
	const [error, setError] = useState<string>();

	const onSubmit = (e: SyntheticEvent): void => {
		e.preventDefault();
	};

	const handleReasonChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setReason(e.target.value);
	};

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleSummit = () => {
		if (!name) {
			setError('I would like to know your name.');
			return;
		}
		if (!reason) {
			setError('I would like to hear your story!');
			return;
		}

		onUpdate({
			status: true,
			name: name,
			reason: reason,
		});
	};

	const handleCancel = () => {
		onUpdate({
			status: false,
		});
	};

	return (
		<form className="flex flex-col" onSubmit={onSubmit}>
			<div className="font-sans text-xl font-semibold text-sdm-cg-200 mb-4">
				{"Hi, What's your name"}
			</div>
			<input
				type="text"
				value={name || ""}
				onChange={handleNameChange}
				className="bg-sdm-cg-800 resize-none px-4 py-2 focus:outline-none rounded-md text-sdm-cg-100 mb-6"
			/>
			<div className="font-sans text-xl font-semibold text-sdm-cg-200 mb-4">
				Why do you want to recommend this book?
			</div>
			<textarea
				value={reason || ""}
				onChange={handleReasonChange}
				className="bg-sdm-cg-800 resize-none p-4 focus:outline-none rounded-md h-40 text-sdm-cg-100 mb-2"
			/>
			<div className="font-sans text-md font-semibold text-sdm-scarlet-500 mb-12">
				{error}
			</div>
			<div className="flex flex-row gap-x-4">
				<button
					onClick={handleSummit}
					className="text-lg px-8 py-1 bg-sdm-cg-800 font-semibold rounded-md text-sdm-cg-200 border border-opacity-0 border-sdm-bronze-700 hover:border-opacity-100 hover:text-sdm-bronze-700"
				>
					Summit
				</button>
				<button
					onClick={handleCancel}
					className="text-lg px-8 py-1 bg-sdm-cg-800 font-semibold rounded-md text-sdm-cg-200 border border-opacity-0 border-sdm-bronze-700 hover:border-opacity-100 hover:bg-sdm-bronze-700 hover:text-sdm-cg-800"
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default RecommendReasonForm;
