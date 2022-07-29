import { Member } from 'src/app/models/member';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MessageGroup } from 'src/app/models/messageGroup';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { MessageGroupService } from 'src/app/services/messageGroup/messageGroup.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import swal from 'sweetalert2';
import { SignalrService } from 'src/app/services/RealTime-signalR/signalr.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-drawer-chat',
  templateUrl: './drawer-chat.component.html',
  styleUrls: ['./drawer-chat.component.scss'],
})
export class DrawerChatComponent implements OnInit {

  @Input()  showSearch:Boolean=true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  groupMembers:Member[];
  //search:string;
  currentGroupId:number;
  allUsers:Member[];
  switchbtn:boolean=false;
  rowData:any;
  dataSource: MatTableDataSource<any>;
  membersDataSource:MatTableDataSource<any>;
  existingMembersDataSource:MatTableDataSource<any>;
  DialogTitle: string;
  errorMessage:any;
  group:MessageGroup=new MessageGroup();
  allMessageGroups:MessageGroup[]=[];
  displayedColumns: string[] = ['Name','Actions'];
  membersDisplayedColumns: string[]=['select','First Name','Last Name','Email','Role'];
  userGroups:MessageGroup[]=[];
  @ViewChild('editGroup') editGroup: TemplateRef<any>;
  @ViewChild('createGroup') createGroup: TemplateRef<any>;
  @ViewChild('editMembers') editMembers:TemplateRef<any>;
  currentUser:Member=new Member();
  groupForm:FormGroup;
  x1=0;
  selection = new SelectionModel<Member>(true, []);
  //selectionToDelete = new SelectionModel<Member>(true, []);
  constructor(private memberService: MembersListService,private messageGroupService:MessageGroupService,private dialog: MatDialog,private formbuilder: FormBuilder,private signalrservice:SignalrService)
  {

    this.groupForm=this.formbuilder.group({
      Name:"",
      Id:-1,
      Members:[],
    });
    memberService.getMembers().subscribe(response=>{
      this.allUsers=response;
      this.membersDataSource=new MatTableDataSource(this.allUsers);
      for(const membre of this.allUsers){
        membre.FullName=membre.FirstName+' '+membre.LastName;
        //console.log(membre.Id);
    }})
  }
  ngOnInit(): void {

  //  this.messageGroupService.getAllGroups().subscribe({next:response=>{this.allMessageGroups=response},
  //     complete:()=>{this.rowData=this.allMessageGroups;
  //       this.dataSource=new MatTableDataSource<any>(this.rowData);}
  //     });
    // this.messageGroupService.getAllGroups().subscribe(
    //   {
    //     next:groupsData=>{
    //       this.rowData=groupsData;
    //       this.dataSource=new MatTableDataSource<any>(this.rowData);
    //     },
    //     error:err=>this.errorMessage=err
    //   }
    // )

    this.memberService.getMember(this.memberService.getCurrentUserId()).subscribe({
      next:response=>{this.currentUser=response},
      complete:()=>{
        this.messageGroupService.getGroupsByUserId(this.currentUser.Id).subscribe( {
          next:response=>{this.userGroups=response},
          complete:()=>{
            if(this.currentUser.MemberStatusId!=1){
              {this.rowData=this.userGroups;
                this.dataSource=new MatTableDataSource<any>(this.rowData);
            }

          }
        }})


            this.messageGroupService.getAllGroups().subscribe({
              next:response=>{this.allMessageGroups=response},
              complete:()=>{
                  if(this.currentUser.MemberStatusId===1)
                  {this.rowData=this.allMessageGroups;
                this.dataSource=new MatTableDataSource<any>(this.rowData);}}
          });
      }
    });
  }
  displayGroup(group:MessageGroup){
    this.group=group;
    this.messageGroupService.getGroupMembers(group.MessageGroupId).subscribe({
      next:response=>{this.groupMembers=response},
      complete:()=>{console.log(this.groupMembers);this.groupForm.patchValue({
        Name:group.Name,
        Id:group.MessageGroupId,
        Members:this.groupMembers
      })}
    })
  }
  onSaveComplete(msg: string): void {
    if (msg != "") {
      Swal({
        position: 'top',
        type: "success",
        title: 'Message Group ' + msg + ' avec succès',
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    }
    //this.refreshHolidayList();
  }
  updateGroup(){
  const aux={...this.group,...this.groupForm.value};
  this.messageGroupService.updateGroup(aux).subscribe({
    next: () => {this.refreshGroupsList();this.onSaveComplete("modifié")},
    error: (err) => (this.errorMessage = err),
  });
  }
  onClickSwitchToCard() {
    this.switchbtn = !(this.switchbtn);
	}
  OpenUpdateDiag(id: number) {
    this.dialog.open(this.editGroup,{panelClass: 'my-custom-dialog-class'});
    this.DialogTitle ="Modifier Groupe"
    if(id!=-1){this.messageGroupService.getGroupById(id.toString())
      .subscribe({
        next: (group: MessageGroup) => this.displayGroup(group),
        error: err => console.log(err)
      });}
  }
  OpenCreateDiag(){
  this.dialog.open(this.createGroup,{panelClass: 'my-custom-dialog-class'});
    this.DialogTitle ="Ajouter Groupe"

  }
  ClearForm(){
  this.groupForm.reset();
  }

  deleteElementAlert() {
  return Swal({
    title: 'Etes-vous sûr de vouloir supprimer cet élément?',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Confirmer',
    type: 'warning',
    cancelButtonText: 'Annuler',
  })
  }
  deleteSuccessfully(){
  return Swal({
    position: 'top',
    title: "Group de message supprimée avec succès",
    type: 'warning',
    showConfirmButton: false,
    timer: 2000,
    toast: true,
  });

  }
  deleteGroup(id:number){
  this.deleteElementAlert().then((result)=>{
    if(result.value){
      this.messageGroupService.deleteGroupById(id.toString()).subscribe({next:()=>{this.refreshGroupsList();this.deleteSuccessfully()},})
    }
  });
  }
  refreshGroupsList(){
  this.messageGroupService.getAllGroups().subscribe({
    next:groupsData=>{
      this.rowData=groupsData;
      this.dataSource=new MatTableDataSource<any>(this.rowData);
    },
    error:err=>this.errorMessage=err
  })
  }
  openMembersDialog(id:number){
   // this.search="";
  this.currentGroupId=id;
  //const aux=this.allUsers

  this.messageGroupService.getGroupMembers(id).subscribe(
    {
    next:response=>
          this.existingMembersDataSource=new MatTableDataSource(response),
  complete:()=>
          this.dialog.open(this.editMembers,{panelClass: 'my-custom-dialog-class'})
  }
  )

  }
  ajouterGroup(){
    const aux={...this.groupForm.value};
    this.messageGroupService.createGroup(aux).subscribe({
    next:()=>{this.refreshGroupsList();this.onSaveComplete("ajouté");}
  })
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.membersDataSource.data.length;
    return numSelected === numRows;
  }
  isAllSelectedtoDelete() {
    const numSelected = this.selection.selected.length;
    const numRows = this.existingMembersDataSource.data.length;
    return numSelected === numRows;
  }
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.membersDataSource.data);
  }
  toggleAllRowstoDelete() {
    if (this.isAllSelectedtoDelete()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.existingMembersDataSource.data);
  }
  checkboxLabel(row?: Member): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }
  checkboxLabeltoDelete(row?: Member): string {
    if (!row) {
      return `${this.isAllSelectedtoDelete() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }
  addMembers(){
    if(this.selection.selected.length>0){
      this.selection.selected.forEach((member)=>{
        this.signalrservice.joinGroups(member.Id)
        this.messageGroupService.addUserToGroup(this.currentGroupId.toString(),member.Id).subscribe()
      }

    );
    this.dialog.closeAll();
      this.onSaveComplete('membre(s) ajouté(s)');
    }
  }
  deleteMembers(){
    if(this.selection.selected.length>0){
      return Swal({
        title: 'Etes-vous sûr de vouloir supprimer ces élément?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmer',
        type: 'warning',
        cancelButtonText: 'Annuler',
      }).then(
        (result)=>{if(result.value)
          {this.selection.selected.forEach(
                (member)=>
                         { this.messageGroupService.deleteUserFromGroup(this.currentGroupId.toString(),member.Id).subscribe();
                          this.signalrservice.removeFromGroup(member.Id,this.currentGroupId.toString());
                        }
  );
  this.dialog.closeAll();
  return Swal({
    position: 'top',
    title: "Membres supprimées avec succès",
    type: 'warning',
    showConfirmButton: false,
    timer: 2000,
    toast: true,
  })
}

        }
      )


    }
  }
  quitGroup(id:number){
    return Swal({
      title: 'Etes-vous sûr de vouloir quitter ce groupe?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer',
      type: 'warning',
      cancelButtonText: 'Annuler',
    })
    .then(
      (result)=>{if(result.value){
        this.messageGroupService.deleteUserFromGroup(id.toString(),this.currentUser.Id).
        subscribe(
          {
            complete:
            ()=>
            {this.signalrservice.removeFromGroup(this.currentUser.Id,id.toString());
              this.messageGroupService.getGroupsByUserId(this.currentUser.Id).subscribe(
                {
        next:response=>{this.userGroups=response},
        complete:()=>{
          if(this.currentUser.MemberStatusId!=1){
            {this.rowData=this.userGroups;
              this.dataSource=new MatTableDataSource<any>(this.rowData);
          }

        }
      }});return Swal({
        position: 'top',
        title: "vous avez quitté le groupe avec succès",
        type: 'warning',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
      });}})}})

  }
  // searchElement(element:Member):boolean{

  //   let fullName:string= element.FirstName+element.LastName;
  //   let exist:boolean= fullName.toUpperCase().includes(this.search.toUpperCase());


  //   return exist;
  // }
  searchMember(event: Event){
    // let aux =this.allUsers;
    // aux.forEach(x=>{if(!this.searchElement(x)){

    //   aux.splice(aux.indexOf(x),1)
    // }})
    // //alert(this.membersDataSource.data.length)
    // // let fullName:string= element.FirstName+element.LastName;
    // //let exist:boolean= fullName.toUpperCase().includes(this.search.toUpperCase());
    // this.membersDataSource=new MatTableDataSource(aux)
    const filterValue = (event.target as HTMLInputElement).value;

    this.membersDataSource.filter = filterValue.trim().toLowerCase();

  }
  searchExistingMember(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;


    this.existingMembersDataSource.filter= filterValue.trim().toLowerCase();
  }
}
