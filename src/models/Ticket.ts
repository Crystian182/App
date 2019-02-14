import { Class } from "./Class";
import { Teacher } from "./Teacher";
import { Employee } from "./Employee";
import { TicketStatus } from "./TicketStatus";
import { TicketMessage } from "./TicketMessage";

export interface Ticket{
    id: number;
	title: String;
	teacher: Teacher;
	employee: Employee;
	ticketStatus: TicketStatus;
	classroom: Class;
	date: Date;
    ticketmessages: TicketMessage[];
}