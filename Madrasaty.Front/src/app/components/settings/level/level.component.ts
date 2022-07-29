
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Discipline } from 'src/app/models/discipline';
import { DisciplineLevel } from 'src/app/models/DisciplineLevel';
import { MemberFilter } from 'src/app/models/member-filter';
import { DisciplineService } from 'src/app/services/discipline/discipline.service';
import { LevelService } from 'src/app/services/level/level.service';
import { MembersListService } from 'src/app/services/members/members-list.service';


import swal from 'sweetalert2';
import { GridOptions } from 'ag-grid-community';

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
  searchStudents: string;
  columnDefs
  disciplineLevels: DisciplineLevel[] = [];
  level: DisciplineLevel;
  lv:DisciplineLevel[] = [];
  rowData
 localeText
  paginationPageSize: number;
  gridOptions: GridOptions;
  rowSelection;
  editType: string;
  levelId:number=840;
  DialogTitle: string;
  level1:DisciplineLevel;
  selectedId:number;
  currentDisciplineId: number;
  students: MemberFilter[] = [];
  etudiantList: MemberFilter[];
  gridColumnApi;
  gridApi; 
  editingRowIndex: any;
  LevelId:any;
  currentLevelId: number;
  autoGroupColumnDef;
  displayedColumns: string[] = ['name', 'Description','Actions'];
  clickedRows = new Set<DisciplineLevel>();
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
  constructor(private levelService: LevelService,
    private disciplineService: DisciplineService,
    private formBuilder: FormBuilder
    ,private dialog: MatDialog,
    private memberService: MembersListService ) {
      

     }

  ngOnInit() {
    this.switchbtn = false;

    this.disciplineFormGroup = this.formBuilder.group({
      disciplineDropDown: ['']
    })
    this.studentFormGroup = this.formBuilder.group({
      disciplineDropDown: ['']
    })
   
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
    swal({
      position: 'top',
      title: "Veuillez selectionner une discipline",
      type: 'info',
      showConfirmButton: false,
      timer: 5000,
      toast: true
    });
    this.LevelForm = this.formBuilder.group({
      Id:[""],
      Wording: ["", Validators.required],
      Description: ["", Validators.required]
      

    });
    this.logIndex(this.clickedRows)
    
  }
  
  logIndex(clickedRows){
    console.log(clickedRows.Id);
    }
  OpenDiag(id: number) {
  
    if(this.selectedId==null ){
      swal({
        position: 'top',
        title: "Veuillez selectionner une discipline",
        type: 'info',
        showConfirmButton: false,
        timer: 3000,
        toast: true
      });

    }
    else{
    this.dialog.open(this.callAPIDialog);
    this.DialogTitle = id == -1 ? "Ajouter un niveau" : "Modifier niveau"
    console.log(id)
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
      this.level1 = level;
      console.log(this.level1)
     
  
      this.LevelForm.patchValue({

        Id:this.level1.Id,
        Wording: this.level1.Wording,
        Description:this.level1.Description
       
       
      });
  
    }

  switchToCard(){
    this.switchbtn = !(this.switchbtn);
  }

  onSaveComplete(msg: string): void {
    if (msg != "") {
      swal({
        position: 'top',
        type: "success",
        title: 'Niveaux ' + msg + ' avec succès',
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    }
  }
  deleteItem(id: number) {

    this.deleteElementAlert().then((result) => {
      if (result.value) {
        this.levelService.deleteDisciplineLevel(id)
          .subscribe({
            next: () => {
              swal({
                position: 'top',
                title: "Niveau supprimé avec succès",
                type: 'warning',
                showConfirmButton: false,
                timer: 2000,
                toast: true,
              });
              this.refreshLevelsList()
              
            },
            error: err => this.errorMessage = err
          });
          
      }
    })
  }
  deleteElementAlert() {
    return swal({
      title: 'Etes-vous sûr de vouloir supprimer cet élément?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer',
      type: 'warning',
      cancelButtonText: 'Annuler',

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
          console.log(this.selectedId)
        
        }
        
       
    
             },
      error: err => this.errorMessage = err
    });
  }
  changeDiscipline(arg:any) {
    console.log(arg.source.value, arg.source.selected)
    this.students = [];
    this.students.length = 0;
    if (arg.source.value != null && arg.source.value != "") {
      this.rowData = this.disciplineLevels.filter(x => x.DisciplineId == arg.source.value)
      console.log(this.rowData)
    }
    else {
      this.rowData=this.disciplineLevels;
      console.log(this.rowData)
    } 
    this.selectedId=arg.source.value;
   
  } 
  addLevel(): void {
    if (this.LevelForm.valid) {
      if (this.LevelForm.dirty) {
        const dispLevel = { ...this.level, ...this.LevelForm.value };
       
        dispLevel.DisciplineId = this.selectedId;
       console.log(dispLevel)
        if(this.level1.Id===null || this.level1.Id===0 ){
        this.levelService.createDisciplineLevel(dispLevel)
          .subscribe({
            next: (data) => {
              this.refreshLevelsList(),
                this.LevelForm.reset()
            },
            error: err => this.errorMessage = err
          });
        }else{
          console.log('cv cv')
          //dispLevel.Id=this.level1.Id
          this.levelService.updateLevel(dispLevel).subscribe({
            next:()=>{this.onSaveComplete("modifié"),
            this.refreshLevelsList(),
            this.LevelForm.reset()
          },
          error:err=>
          alert('Oops...le nom de votre niveau est deja pris, merci de renseigner un autre nom.')
          });
        }

      }
    } else{
      this.errorMessage = 'Veuillez saisir correctement les champs demandés.';
    } 
  }
  getDisciplineLevels(): void {
    this.disciplineService.disciplineIdData.subscribe(data => {
      //this.currentDisciplineId = data;
      this.levelService.getLevelsByDiscipline(this.selectedId)
        .subscribe({
          next: (levels) => this.disciplineLevels = levels,
          error: err => console.log(err)
        });
    })

  }
      
  getStudents(): void {
    this.memberService.GetStudents(this.levelId)
      .subscribe({
        next: levels =>{
          this.students = levels;
          this.etudiantList = levels;
        },
        error: err => console.log(err)
      });
      console.log("ccccccc"+this.students)
  }
  onCellValueChanged($event) {
   
    if ($event.data.Id == 0) {
      $event.data.DisciplineId=this.disciplineDropDown.value.Id
      this.levelService.createDisciplineLevel($event.data)
        .subscribe({
          next: (data) => { 
            var rowNode = this.gridApi.getRowNode(0)
            rowNode.setDataValue('Id', data.Id);
            this.onSaveComplete("modifié") },
          error: err => this.errorMessage = err
        });
    }
    else {
      this.levelService.updateLevel($event.data)
      .subscribe({
        next: () => this.onSaveComplete("modifié"),
        error: err => this.errorMessage = err
      });
    }

}
/* onSelectionChanged($event) {
  var selectedRows = this.gridApi.getSelectedRows();
  this.currentLevelId = selectedRows[0].Id
  this.getStudents(selectedRows[0].Id);
} */
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

/* dataGridInit() {
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

    
    ];

} */
get studentDropDown() {
  return this.studentFormGroup.get('studentDropDown');
}

changeStudent() {
  this.students = [];
  this.students.length = 0;
  this.students = this.etudiantList /* .filter(it => {
    return (it.Id.toString().includes(this.studentDropDown.value.Id.toString()))

  }); */
}
}
