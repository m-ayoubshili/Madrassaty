interface MessageModel {
  userName:string,
  photo?:string,
  user: string;
  type: 'in' | 'out';
  text: string;
  time: String;
  template?: boolean;
  pieceJointe?:File;
}

const defaultMessages: Array<MessageModel> = [

];

interface UserInfoModel {
  initials?: {
    label: string;
    state: 'warning' | 'danger' | 'primary' | 'success' | 'info';
  };
  name: string;
  avatar?: string;
  email: string;
  position?: string;
  online?: boolean;
}

const defaultUserInfos: Array<UserInfoModel> = [
  {
    name: 'Emma Smith',
    avatar: 'avatars/150-1.jpg',
    email: 'e.smith@kpmg.com.au',
    position: 'Art Director',
    online: false,
  },
  {
    name: 'Melody Macy',
    initials: { label: 'M', state: 'danger' },
    email: 'melody@altbox.com',
    position: 'Marketing Analytic',
    online: true,
  }
];

const messageFromClient: MessageModel = {
  userName:"",
  photo:"",
  user: "4",
  type: 'in',
  text: 'Thank you for your awesome support!',
  time: 'Just now',
};

export {
  MessageModel,
  defaultMessages,
  UserInfoModel,
  defaultUserInfos,
  messageFromClient,
};
