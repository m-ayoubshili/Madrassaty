import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  defaultMessages,
  MessageModel,
} from './dataExample';
import { SignalrService } from 'src/app/services/RealTime-signalR/signalr.service';
import { MessageService } from 'src/app/services/message/message.service';
import { MessageGroupService } from 'src/app/services/messageGroup/messageGroup.service';
import { Message } from 'src/app/models/message';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { Member } from 'src/app/models/member';
import swal from 'sweetalert2';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-chat-inner',
  templateUrl: './chat-inner.component.html',
})
export class ChatInnerComponent implements OnInit,AfterViewChecked,OnDestroy{
   @HostListener('document:click', ['$event'])
   clickout(event) {
     if(!this.eRef.nativeElement.contains(event.target)) {

    this.fileToUpload=null
    this.selected=false


    }
   }
  @Input() isDrawer: boolean = false;
  @HostBinding('class') class = 'card-body';
  @HostBinding('id') id = this.isDrawer
    ? 'kt_drawer_chat_messenger_body'
    : 'kt_chat_messenger_body';
  @ViewChild('messageInput', { static: true })
  messageInput: ElementRef<HTMLTextAreaElement>;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  form:ElementRef;
  message=''
  nbMsgNonLus:number;
  //set = 'twitter';
  //showEmojiPicker:boolean;
  contact:Member=new Member();
  toGroup:boolean=false;
  contactIdSubscription:Subscription;
  groupIdSubscription:Subscription;
  messageSubscription:Subscription;
  private recieverId:any;
  private messages$: BehaviorSubject<Array<MessageModel>> = new BehaviorSubject<
    Array<MessageModel>
  >(defaultMessages);
  messagesObs: Observable<Array<MessageModel>>;
  currentId:string;
  nomContact:string;
  pic:string=environment.MEMBER_PHOTO_PATH+ "unknown.jpg";
  fileToUpload: string|ArrayBuffer;
  fileToUpload2: string|ArrayBuffer;
  photoBytes:any;
  photoPath:string|any;
  selected:boolean=false;
  fileName:string;
  /* Constructeur permet l'injection de :
        * messageGroupService:
                           - pour recevoir l'ID du groupe selectionné
        * messageService :
                           - recevoir l'ID du contact selectionné
                           - recevoir les conversation privées et de groupe
                           - envoie de message
        * memberService:
                           - pour recuperer les données des utilisateurs
        * signalR service:
                           - pour les fonctionalités temps reél

     l'inscription aux evenements du click (selection) sur un contact ou un group

  */
  constructor(private eRef: ElementRef,private signalRService:SignalrService,private messageGroupService:MessageGroupService,private messageService:MessageService,private memberService:MembersListService) {
    this.signalRService.initializeSignalRConnection();
    this.messagesObs = this.messages$.asObservable();
    this.contactIdSubscription=messageService.contactClicked$.subscribe(contactId=>this.onContactClicked(contactId));
    this.groupIdSubscription=messageGroupService.groupClicked$.subscribe(groupId=>this.onGroupClicked(groupId));
    this.messageSubscription=signalRService.messageRecieved$.subscribe(message=>this.onMessageRecieved(message));
    this.currentId=memberService.getCurrentUserId();
    this.nbMsgNonLus=0;
  }
  ngOnDestroy(){
    //alert("dest")
    // this.contactIdSubscription.unsubscribe();
    // this.groupIdSubscription.unsubscribe();
    // this.messages$.unsubscribe();
  }
  /*
    Méthode onContactClicked:
      * déclenchée lorsque un contact est selectionné
  */
onContactClicked(contactId:string){

  //indiquer que c'est une conversation privée
  this.toGroup=false;
  //recupération de l'Id du contact selectionné
  this.recieverId=contactId;
  //initialisation des messages à afficher
  var messageModels:MessageModel[]=[];

  //recuperer les messages de la conversation entre l'utilisateur courant et le contact choisi
  this.messageService.getPrivateConversation(this.currentId,this.recieverId).subscribe(
    response=>{response.forEach(
      //Formattage de chaque message recu en MessageModel
      element => {messageModels.push(this.messageToMessageModel(element));}
      )
  }
    );
//mise a jour de la liste des message à afficher
this.messages$.next(messageModels);
this.memberService.getCurrentMember(contactId).subscribe(x=>{this.nomContact=x.FirstName+" "+x.LastName;
this.pic=this.memberService.GetMemberPhotoPath(x.PhotoPath);
})
}
/*
    Méthode onGroupClicked:
      * déclenchée lorsque un group de conversation est selectionné
  */
onGroupClicked(groupId:number){
  //indique que c'est un message de groupe
  this.toGroup=true;
  //recupération de l'Id de group
  this.recieverId=groupId;

  this.pic=environment.MEMBER_PHOTO_PATH+ "unknown.jpg"

  //initialisation des messages à afficher
  var messageModels:MessageModel[]=[];
  //recuperation de la conversation de groupe
  this.messageService.getGroupConversation(groupId).subscribe(
    response=>{response.forEach(
      element => {
         //Formattage de chaque message recu en MessageModel
        messageModels.push(this.messageToMessageModel(element));
      }
      )}
  );
  //mise a jour de la liste des message à afficher
  this.messages$.next(messageModels);
  this.messageGroupService.getGroupById(groupId.toString()).subscribe(x=>{this.nomContact=x.Name});
}
onMessageRecieved(msg:Message){
  this.fileToUpload=msg.PieceJointe
if(!msg.ToGroup){
  if(msg.SenderId!=msg.ReceiverId&&this.recieverId==msg.SenderId)
  this.addMessage(this.messageToMessageModel(msg));
  else if(msg.SenderId!=msg.ReceiverId&&this.recieverId!=msg.SenderId)
  {
    this.memberService.getCurrentMember(msg.SenderId).subscribe(x=>{
      this.nbMsgNonLus=this.nbMsgNonLus+1;
      return swal({
      position: 'top',
      title: "New message from "+x.FirstName+" "+x.LastName,
      type: 'info',
      showConfirmButton: false,
      timer: 2500,
      toast: true,
    }
  )})
  }
}else{
  if(this.recieverId==msg.ReceiverId&&msg.SenderId!=this.currentId){
    this.addMessage(this.messageToMessageModel(msg))
  }else{
    this.messageGroupService.getGroupById(msg.ReceiverId).subscribe(x=>{
      this.nbMsgNonLus=this.nbMsgNonLus+1;
      return swal({
        position:'top',
        title:"New message in your Group : "+x.Name,
        type:'info',
        showConfirmButton: false,
        timer: 2500,
        toast: true,
      })
    })
  }
}
}

//fonction de l'envoie de message
  submitMessage(): void {
    //recupére le text ecrit par l'utilisateur
    const text = this.messageInput.nativeElement.value;
    if(this.fileToUpload!=null&&this.fileToUpload!=undefined){
      this.photoBytes=this.fileToUpload;
      //console.log("aaaa"+this.photoBytes);
      var array =  this.photoBytes.split(",", 3);
      this.photoBytes=array[1];
      //console.log("bbbb"+this.photoBytes);
    }else{
      this.photoBytes="";
    }
    //création d'un modéle de message
    const msg :Message=
        {
          MessageBody:text,
          ReceiverId:this.recieverId,
          SenderId:this.currentId,
          ToGroup:this.toGroup,
          PhotoPath:this.photoBytes,
          PieceJointe:this.fileToUpload,
        };

    let messageModel = {
      PhotoBytes:this.photoBytes,
      Message: msg

    }
    this.signalRService.sendMessage(msg);
    //ajout du message à la base de données == envoie de message
    this.messageService.createMessage(messageModel).subscribe();
    //vide l'espace d'ecriture du nouveaux messages
    this.messageInput.nativeElement.value = '';
    //mise à jour des message affichées :ajoute le nouveau message envoyé
    this.addMessage(this.messageToMessageModel(msg));



    this.fileToUpload2=this.fileToUpload;
    this.selected=false;

    this.fileToUpload2=this.fileToUpload;
    this.fileToUpload=null
  }
  //ajoute le message envoyée
  addMessage(newMessage: MessageModel): void {
    const messages = [...this.messages$.value];

    messages.push(newMessage);
    this.messages$.next(messages);
  }

  getMessageCssClass(message: MessageModel): string {
    return `p-5 rounded text-dark fw-bold mw-lg-400px bg-light-${
      message.type === 'in' ? 'info' : 'primary'
    } text-${message.type === 'in' ? 'start' : 'end'}`;
  }

  ngAfterViewChecked() {
}

scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
}
  ngOnInit(): void {
    this.scrollToBottom();
    // this.subscription = this.signalRService.getEvent()
    //   .subscribe(item => this.addMessage(item));
  }
  //formate le message en messageModel
  private messageToMessageModel(message:any):MessageModel{
    return {
      userName:this.contact.FirstName+" "+this.contact.LastName,
      user:message.SenderId,
      text:message.MessageBody,
      time:message.Date,
      type:(message.SenderId==this.currentId)?'out':'in',
      photo:message.PhotoPath,
    }
  }

  handleFileToUpload(file:File){
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.fileToUpload = reader.result;
        this.photoPath=this.fileToUpload;
        this.selected=true;
        this.fileName=file.name;
      };

    }

  }
dtest(){
  alert(this.nbMsgNonLus)
}
  // onFocus() {
  //   console.log('focus');
  //   this.showEmojiPicker = false;
  // }
  // onBlur() {
  //   console.log('onblur')
  // }
  // toggleEmojiPicker() {
  //   console.log(this.showEmojiPicker);
  //       this.showEmojiPicker = !this.showEmojiPicker;
  // }
  // addEmoji(event) {
  //   console.log(this.message)
  //   const { message } = this;
  //   console.log(message);
  //   console.log(`${event.emoji.native}`)
  //   const text = `${message}${event.emoji.native}`;

  //   this.message = text;
  //   // this.showEmojiPicker = false;
  // }
}
