import { User } from "./User";
import { PreviewChat } from "./PreviewChat";

export class ChatMessage {
	sender: User;
	text: String;
    date: Date;
    read?: boolean;
}