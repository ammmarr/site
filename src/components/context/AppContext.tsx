import { createContext } from "react";
export const AppContext = createContext({
	name: "",
	phone: "",
	email: "",
	token: "",
});
