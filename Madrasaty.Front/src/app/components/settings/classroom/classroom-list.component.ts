import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Classroom } from 'src/app/models/classroom';
import { ClassroomService } from 'src/app/services/classroom/classroom.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
  styleUrls: ['./classroom-list.component.scss']
})
export class ClassroomListComponent implements OnInit {
  errorMessage = '';
  rowData
  switchbtn: boolean = false;
  rowId: number = -1;
  search:string;
  classroomForm: FormGroup;
  classroom: Classroom; 
  DialogTitle: string;
  constructor(private notification: NotificationService,private classroomService: ClassroomService , private formBuilder: FormBuilder) {    

 
  }

  ngOnInit() {   
    this.classroomForm = this.formBuilder.group({
      Wording: ['', Validators.required],
      NumberProjector: [0, [Validators.required]],
      NumberDesk: [0, [Validators.required]],
      NumberChair: [0, [Validators.required]],
    });
    this.refreshClassroomList()
  }

  searchResult(data){
    this.search=data
  }

  deleteItem(id: number) {
    this.notification.deleteElementAlert().then((result) => {
      if (result.value) {
        this.classroomService.deleteClassroom(id)
          .subscribe({
              next: () => this.notification.onSaveComplete('warning',"Classe","supprimée",this.refreshClassroomList()),
            error: err => this.errorMessage = err
          }); 
      }else {this.refreshClassroomList()}
    })
  }

  refreshClassroomList() {
    this.classroomService.getClassrooms().subscribe({
      next: classrooms => {
        this.rowData = classrooms;
      },
      error: err => this.errorMessage = err
    });
  }

  saveClassroom(): void {
    if (this.classroomForm.valid) {
      if (this.classroomForm.dirty) {
        const disp = { ...this.classroom, ...this.classroomForm.value };

        if (disp.Id === 0) {
          this.classroomService.createClassroom(disp)
            .subscribe({
              next: () => this.notification.onSaveComplete('success',"Classe ","ajoutée",this.refreshClassroomList()),
              error: err => this.errorMessage = err
            });

        } else {
          this.classroomService.updateClassroom(disp)
            .subscribe({
              next: () =>  this.notification.onSaveComplete('success',"Classe ","modifiée",this.refreshClassroomList()),
              error: err => this.errorMessage = err
            });
        }
      } else {
   
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }
  

  displayClassroom(classroom: Classroom): void {
    if (this.classroomForm) {
      this.classroomForm.reset();
    }
    this.classroom = classroom;

    this.classroomForm.patchValue({
      Wording: this.classroom.Wording,
      NumberProjector: this.classroom.NumberProjector,
      NumberDesk: this.classroom.NumberDesk,
      NumberChair: this.classroom.NumberChair

    });
  }
  OpenDiag(id: number) {

    this.DialogTitle = id == -1 ? "Ajouter une sale" : "Modifier une sale"
    this.classroomService.getClassroom(id)
      .subscribe({
        next: (classroom: Classroom) => this.displayClassroom(classroom),
        error: err => console.log(err)
      });
    }
  
  
}
