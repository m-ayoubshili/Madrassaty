
import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-settings-header-shared',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.scss']
})
export class HeaderSharedComponent implements OnInit {
  @Output() btnClick = new EventEmitter();
  @Output() btnClickSwitchToCard = new EventEmitter(); 
  @Output() SearchEvent = new EventEmitter<string>(); 
  @Input()  showSearch:Boolean=true;
  search:string;

  constructor()
  {    }

  ngOnInit(): void { 
   
 }
onChangeEvent(event: any){
  this.search=event.target.value;
  this.SearchEvent.emit(this.search);
}
  onClick() { 
	this.btnClick.emit();    
	}  
  onClickSwitchToCard() {
		this.btnClickSwitchToCard.emit();
	}
}
