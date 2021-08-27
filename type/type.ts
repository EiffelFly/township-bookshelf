export interface Book {
	title: string;
	subtitle: string;
	authors: string;
	publishedDate: string;
	publisher: string;
	description: string;
	language: string;
	pageCount: number;
	image: string;
}

export interface updateProp {
  status: boolean;
  message?: string;
}