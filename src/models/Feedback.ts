import { User } from "./User";

export class Feedback {
    id: number;
	date: Date;
	description: String;
    stars: number;
    user: User;
}