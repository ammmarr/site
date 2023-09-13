import __authors from "./jsons/__users.json";
import { AuthorType } from "./types";

const imgs: any = [];

const DEMO_AUTHORS: AuthorType[] = __authors.map((item, index) => ({
	...item,
	avatar: imgs[index] || item.avatar,
}));

export { DEMO_AUTHORS };
