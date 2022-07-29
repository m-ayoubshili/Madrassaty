import { Component, ViewChild,ViewChildren, OnInit , ElementRef } from '@angular/core';
import { DisciplineService } from 'app/services/discipline/discipline.service';
import { Discipline } from 'app/models/discipline';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DisciplineEditComponent } from './discipline-edit.component';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { LevelAddComponent } from '../level/level-add.component';
import { GridOptions, Module } from 'ag-grid-community';
import { DisciplineRowLevelsComponent } from './discipline-row/discipline-row-levels.component';
import { BtnUpdateDeleteComponent } from 'app/components/common/btn-update-delete.component';
import { GenericValidator } from 'app/shared/generic-validator';
import { merge, fromEvent, Observable } from 'rxjs';

declare let $: any;
@Component({
  selector: 'app-discipline-list',
  templateUrl: './discipline-list.component.html',
  styles: []
})
export class DisciplineListComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
  bsModalRef: BsModalRef;
  disciplines: Discipline[] = [];
  switchbtn;
  disciplineForm: FormGroup;
  errorMessage = '';
  columnDefs
  rowData
  domLayout: string;
  gridOptions: GridOptions;
  paginationPageSize: number;
  localeText;
  editType: string;
  editingRowIndex: any;
  gridColumnApi;
  gridApi;
  //form group pour le controlle de form lors de l'ajout d'un discipline
  DisciplineForm: FormGroup;
  discipline: Discipline;
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  modalTitle: string;
  sd:Discipline;
  desModal:Discipline;
  tt:Discipline;

  constructor( private formBuilder: FormBuilder, private disciplineService: DisciplineService, private modalService: BsModalService, private router: Router) {
    this.dataGridInit()
    this.DisciplineForm = this.formBuilder.group({
      Wording:[],
      Description:[],
      CreatedOn:[]

    });
    this.validationMessages = {
      Wording: {
        required: 'Le nom est obligatoire et doit être unique.'
      },
      Description: {
        required: 'Description est obligatoire.'
      },
      CreatedOn: {
        required: 'CreatedOn est obligatoire.'
      },
    }
    this.genericValidator = new GenericValidator(this.validationMessages);
    this.DisciplineForm = this.formBuilder.group({
      Wording: ["", Validators.required],
      Description: ["", Validators.required],
      CreatedOn: [""]
    });
  }

  ngOnInit() {
    this.switchbtn = false;
    this.disciplineService.getDisciplines().subscribe({
      next: disciplines => {
        this.rowData = disciplines;
      },
      error: err => this.errorMessage = err
    });

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
    }
    this.paginationPageSize = 10;
    this.editType = "fullRow";
    this.domLayout = 'autoHeight';
    this.columnDefs =
      [
        { headerName: 'Nom', field: 'Wording', sortable: true, filter: true, resizable: true, editable: true, width: 100 },
        {
          headerName: 'Description', field: 'Description', sortable: true, filter: true, resizable: true, editable: true
        },
        {
          headerName: "Niveaux", field: "Id", resizable: true, cellRendererFramework: DisciplineRowLevelsComponent, width: 100
        },
        {
          headerName: "", field: "Id", cellRendererFramework: BtnUpdateDeleteComponent, width: 100
        }
      ];
  }
  switchToCard(){
    this.switchbtn = !(this.switchbtn);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

  }

  editItem(id: number) {
    var rowNode = this.gridApi.getRowNode(0)
    if ((rowNode==undefined) || (rowNode.data["Id"] != 0 && rowNode.data["Wording"] != "")) {
      let newRow = { "Id": 0, "Wording": "", "Code": "", "Description": "", "CreatedOn": "" };
      this.rowData.splice(0, 0, newRow);
      this.gridApi.setRowData(this.rowData);
    }
  }

  deleteItem(id: number) {

    this.deleteElementAlert().then((result) => {
      if (result.value && id!=0) {
        this.disciplineService.deleteDiscipline(id)
          .subscribe({
            next: () => {
              this.refreshDisciplineList(),
              Swal({
                position: 'top',
                title: "Discipline supprimée avec succès",
                type: 'warning',
                showConfirmButton: false,
                timer: 2000,
                toast: true,
              });
            },
            error: err => this.errorMessage = err
          });
      }
      else
      {
        this.refreshDisciplineList()
      }
    })
  }

  //Method that opens a modal to Add/Delete DisciplineLevels 
  editDisciplineLevels(id: number) {
    this.disciplineService.changeDisciplineId(id);
    this.bsModalRef = this.modalService.show(LevelAddComponent, { class: 'modal-lg' });
    this.bsModalRef.content.modalTitle = 'Add Discipline Level';

  }

  //Method to popup an alert before deleting an item 
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

  //Enable cell editing when cell clicked
  onCellClicked($event) {
   // if (this.editingRowIndex != $event.rowIndex) {
      //console.log($event);
      $event.api.startEditingCell({
        rowIndex: $event.rowIndex,
        colKey: $event.column.colId
      });
      this.editingRowIndex = $event.rowIndex;
   // }
  }
  //Update Discipline when cell value changed
  onCellValueChanged($event) {
    if ($event.data.Id == 0) {
      this.disciplineService.createDiscipline($event.data)
        .subscribe({
          next: (data) => { 
            var rowNode = this.gridApi.getRowNode(0)
            rowNode.setDataValue('Id', data.Id);
            this.onSaveComplete("modifié") },
          error: err => this.errorMessage = err
        });
    }
    else {
      this.disciplineService.updateDiscipline($event.data)
      .subscribe({
        next: () => this.onSaveComplete("modifié"),
        error: err => this.errorMessage = err
      });
    }
  }

  onSaveComplete(msg: string): void {
    if (msg != "") {
      Swal({
        position: 'top',
        type: "success",
        title: 'Discipline ' + msg + ' avec succès',
        showConfirmButton: false,
        timer: 2000,
        toast: true
      });
    }
  }
  //Method to refresh the list of Disciplines
  refreshDisciplineList() {
    this.disciplineService.getDisciplines().subscribe({
      next: disciplines => {
        this.rowData = disciplines;
      },
      error: err => this.errorMessage = err
    });
  }
  closeModal() {
    this.closeBtn.nativeElement.click();
  }
  displayDiscipline(discipline: Discipline): void {
    if (this.DisciplineForm){
      this.DisciplineForm.reset();
    }
    this.discipline = discipline;

    this.DisciplineForm.patchValue({
      Wording: this.discipline.Wording,
      Description: this.discipline.Description,
      CreatedOn: this.discipline.CreatedOn
     
     
    });

  

  }

  editDs(id: number) {
    this.disciplineService. changeDisciplineId(id);
    this.bsModalRef = this.modalService.show(DisciplineEditComponent, { class: 'modal-content' });
    this.bsModalRef.content.modalTitle = id === -1 ? 'Ajouter Discipline' : 'Modifier Discipline';
   /// this.sd=this.disciplineService.getDiscipline(id);
    this.modalService.onHide.subscribe(() => {
   // this.displayDiscipline();
    })
  }
  openModal(id: number, fromGrid: false) {
    if (fromGrid) { $("#myModal1").modal("show"); }
    this.modalTitle = id == -1 ? "Ajouter discipline" : "Modifier discipline"
    this.disciplineService. getDiscipline(id)
      .subscribe({
        next: (discipline: Discipline) => this.displayDiscipline(discipline),
        error: err => console.log(err)
      });
  }
 
  


  /* */
  //methode pour ajouter un discipline ********

  saveDiscipline(): void {
    if (this.DisciplineForm.valid) {
      // if (this.schoolForm.dirty) {
      const sc = { ...this.discipline, ...this.DisciplineForm.value ,DisciplineLevels:null};
      
     
      
         const w= this.discipline.Wording=this.DisciplineForm.get("Wording").value;
          const d=this.discipline.Description=this.DisciplineForm.get("Description").value;
        const c= this.discipline.CreatedOn=this.DisciplineForm.get("CreatedOn").value;
         
       
         console.log(w);
         console.log(d);
         console.log(c);
         //const data ={...w,...d,...c, DisciplineLevels:null}
        const data ={...this.sd,...this.DisciplineForm.value,DisciplineLevels:null}

    console.log(this.DisciplineForm.value);


     // if (sc.Id===0) {
        if (data.id===0) {
        this.disciplineService.createDiscipline( data)
        
          .subscribe({
            next: () => {
            this.onSaveComplete("ajoutée"),
            this.refreshDisciplineList()},
           
            error: err => alert(
              'Oops... un probleme lors de la creation de disciplines')
          });
          this.closeModal();
          //this.refreshDisciplineList();
      } else {
        this.disciplineService.updateDiscipline(data)
        .subscribe({
          next: () => this.onSaveComplete("modifiée"),
          error: err =>   
          alert(
            'Oops... Le nom de votre discipline est déjà pris, merci de renseigner un autre nom.')
        });
        
      }
     
    } else {
      this.errorMessage = 'Veuillez saisir correctement les champs demandés.';
    }
  }
  /************************** */
  //cette methode pour activer les form controller du formulaire d'ajout descipline
  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

      //il faut changer les ECMAScript es5 dans tsconfig to es6 

    merge(this.DisciplineForm.valueChanges, ...controlBlurs).pipe(
    ).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.DisciplineForm);
    });
  
  }


}
