import { ChatMessage } from "./ChatMessage";
import { User } from "./User";
import { SubjectStudy } from "./SubjectStudy";

export class PreviewChat {
	toUser: User;
	subject: SubjectStudy;
	lastMessage: ChatMessage;
}
