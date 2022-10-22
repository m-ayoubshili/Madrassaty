
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Discipline } from 'src/app/models/discipline';
import { DisciplineLevel } from 'src/app/models/DisciplineLevel';
import { MemberFilter } from 'src/app/models/member-filter';
import { DisciplineService } from 'src/app/services/discipline/discipline.service';
import { LevelService } from 'src/app/services/level/level.service';
import { MembersListService } from 'src/app/services/members/members-list.service';
import { GridOptions } from 'ag-grid-community';
import { BtnUpdateDeleteComponent } from 'src/app/shared/btn-update-delete/btn-update-delete.component';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit {
  switchbtn: boolean = false;
  disciplineList: Discipline[];
  errorMessage = '';
  disciplineFormGroup: FormGroup;
  LevelForm:FormGroup;
  studentFormGroup: FormGroup;
  domLayout: string;
  FiltredList: any;
  columnDefs
  disciplineLevels: DisciplineLevel[] = [];
  level: DisciplineLevel;

  rowData
 localeText
  paginationPageSize: number;
  gridOptions: GridOptions;
  rowSelection;
  editType: string;
  DialogTitle: string;
 
  selectedId:number;
  students: MemberFilter[] = [];
  etudiantList: MemberFilter[];
  gridColumnApi;
  gridApi; 
  search
  editingRowIndex: any;
  LevelId:any;
  currentLevelId: number;

  constructor(private levelService: LevelService,private disciplineService: DisciplineService, private formBuilder: FormBuilder, private notification: NotificationService ,
    private memberService: MembersListService ) {
     

     }


  ngOnInit() {
      this.disciplineFormGroup = this.formBuilder.group({
      disciplineDropDown: ['']
    })
    this.studentFormGroup = this.formBuilder.group({
      disciplineDropDown: ['']
    })
    this.LevelForm = this.formBuilder.group({
      Id:[""],
      Wording: ["", Validators.required],
      Description: ["", Validators.required]     
    });

    this.levelService.getDisciplineLevels().subscribe({
      next: disciplineLevels => {
        this.disciplineLevels = disciplineLevels;
        this.rowData = disciplineLevels;
      },
      error: err => this.errorMessage = err
    });

    this.disciplineService.getDisciplines().subscribe({
      next: disciplines => {
        this.disciplineList = disciplines;
      },
      error: err => this.errorMessage = err
    });
    this.notification.warningPopupForLevel();

  
    
  this.dataGridInit();   
  }

  searchResult(data){
    this.search=data
    console.log(data)
  }


  OpenDiag(id: number) {  
  
    if(this.selectedId==null ){
      this.notification.warningPopupForLevel()
    }
    else{ 
        this.DialogTitle = id == -1 ? "Ajouter un niveau" : "Modifier niveau"
        this.levelService.DisciplineLevelById(id).subscribe({
        next: (disciplineLevel: DisciplineLevel) => this.displayDisciplineLevel(disciplineLevel),
        error: err => console.log(err)    
      });       
    }
    } 

    displayDisciplineLevel(level: DisciplineLevel){
      if (this.LevelForm){
        this.LevelForm.reset();
      }
      this.level = level;
      console.log(this.level)
     
  
      this.LevelForm.patchValue({

        Id:this.level.Id,
        Wording: this.level.Wording,
        Description:this.level.Description
       
       
      });  
    }
  deleteItem(id: number) {
    this.notification.deleteElementAlert().then((result) => {
      if (result.value) {
        this.levelService.deleteDisciplineLevel(id)
          .subscribe({
            next: () => { this.notification.onSaveComplete('warning',"Niveau","supprimée",this.refreshLevelsList())},          
            error: err => this.errorMessage = err
          });
          
      }
    })
  }

  get disciplineDropDown() {
    return this.disciplineFormGroup.get('disciplineDropDown');
  }
  refreshLevelsList() {
    this.levelService.getDisciplineLevels().subscribe({
      next: disciplineLevels => { 
        
        if(this.disciplineDropDown.value.Id==null && this.disciplineDropDown.value.Id=="" ) {
          this.rowData = disciplineLevels
        }     
        else {
          this.rowData = disciplineLevels.filter(L=>L.DisciplineId==this.selectedId)        
          }  },
      error: err => this.errorMessage = err
    });
  }

  changeDiscipline(arg:any) {
    console.log(arg.source.value, arg.source.selected)
    this.students = [];
    this.students.length = 0;
    if (arg.source.value != null && arg.source.value != "") {
      this.rowData = this.disciplineLevels.filter(x => x.DisciplineId == arg.source.value)
  
    }
    else {
      this.rowData=this.disciplineLevels;  
    } 
    this.selectedId=arg.source.value;   
  } 

  addLevel(): void {
    if (this.LevelForm.valid) {
      if (this.LevelForm.dirty) {
        const dispLevel = { ...this.level, ...this.LevelForm.value };
       
        dispLevel.DisciplineId = this.selectedId;
       console.log(dispLevel)
        if(this.level.Id===null || this.level.Id===0 ){
        this.levelService.createDisciplineLevel(dispLevel)
          .subscribe({
            next:() => {this.notification.onSaveComplete('success',"Niveau","ajouté",this.refreshLevelsList())},
            error: err => this.errorMessage = err
          });
        }else{
          this.levelService.updateLevel(dispLevel).subscribe({
            next:()=>{this.notification.onSaveComplete('success',"Niveau","modifiée",this.refreshLevelsList()) },
          error:err=> alert('Oops...le nom de votre niveau est deja pris, merci de renseigner un autre nom.')  });
        }

      }
    } else{
      this.errorMessage = 'Veuillez saisir correctement les champs demandés.';
    } 
  }
  getDisciplineLevels() {
    this.disciplineService.disciplineIdData.subscribe(data => {
      this.levelService.getLevelsByDiscipline(this.selectedId)
        .subscribe({
          next: (levels) => this.disciplineLevels = levels,
          error: err => console.log(err)
        });
    })

  }
 
      
  onCellValueChanged($event) {   
    if ($event.data.Id == 0) {
     $event.data.DisciplineId=this.selectedId
      this.levelService.createDisciplineLevel($event.data)
        .subscribe({
          next: (data) => { 
            var rowNode = this.gridApi.getRowNode(0)
            rowNode.setDataValue('Id', data.Id);
            this.notification.onSaveComplete('success',"Niveau","ajouté",this.refreshLevelsList()) },
          error: err => this.errorMessage = err
        });
    }
    else {
      this.levelService.updateLevel($event.data)
      .subscribe({
        next: () => this.notification.onSaveComplete('success',"Niveau","modifié",this.refreshLevelsList()),
        error: err => this.errorMessage = err
      });
    }

}

onGridReady(params) {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  params.api.sizeColumnsToFit(); 

}
onCellClicked($event) {   
  $event.api.startEditingCell({
    rowIndex: $event.rowIndex,
    colKey: $event.column.colId
  });
  this.editingRowIndex = $event.rowIndex;
 
}
sizeToFit() {
  this.gridApi.sizeColumnsToFit();
}

dataGridInit() {
  this.gridOptions = <GridOptions>{
    context: {
      componentParent: this
    },
  };
  this.localeText = {
    next: 'Suivant',
    to: 'à',
    of: 'sur',
    contains: 'Contient',
    notContains: 'Ne contient pas',
    startsWith: 'Commence par',
    endsWith: 'Finis par',
    equals: 'Egale à',
    notEqual: 'Différent de',
    inRange: 'Entre',
    andCondition: 'ET',
    orCondition: 'OU',
    lessThan: 'Inférieur à',
    greaterThan: 'Supérieur à',
    lessThanOrEqual: 'Inférieur ou égal',
    greaterThanOrEqual: 'Supérieur ou égal',
    noRowsToShow: "Il n'y a pas de données",

  }
  this.paginationPageSize = 10;
  this.editType = "fullRow";
  this.domLayout = 'autoHeight';
  this.rowSelection = 'single';
  this.columnDefs =
    [
      {
        headerName: 'Nom', field: 'Wording',
        showRowGroup: true,
        cellRenderer: 'agGroupCellRenderer'
        , sortable: true, filter: true, resizable: true, editable: true, 
      },
      { headerName: 'Description', field: 'Description', sortable: true, filter: true, resizable: true, editable: true },
      {
        headerName: "action", field: "Id", cellRendererFramework: BtnUpdateDeleteComponent,suppressSizeToFit: true, resizable: true, width:150
      }    
    ];
  }  
get studentDropDown() {
  return this.studentFormGroup.get('studentDropDown');
}
 onSelectionChanged($event) {
  var selectedRows = this.gridApi.getSelectedRows();
  this.currentLevelId = selectedRows[0].Id
  this.getStudents(selectedRows[0].Id);
} 
 getStudents(levelId): void {
  this.memberService.GetStudents(levelId)
    .subscribe({
      next: levels =>{
        this.students = levels;
        this.etudiantList = levels;
      },
      error: err => console.log(err)
    });
} 

onChange() {
  this.levelService.AssignLevelStudent(this.currentLevelId, this.students)
    .subscribe({
      next: () => console.log("student edited"),
      error: err => console.log("erreur edited")
    });;
}
}
