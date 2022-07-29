export class Message{
Id?:number;
SendingDate?:string;
MessageBody:string;
SenderId:string;
ReceiverId:string;
ToGroup:boolean;
PieceJointe?:string|ArrayBuffer;
PhotoPath?:string;
}
