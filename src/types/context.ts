type ID = number | string

type User = {
	id: number;
	name: string;
};

type News = {
	text: string;
}

export type Context = {
	user?: User;
	news?: News;
};
