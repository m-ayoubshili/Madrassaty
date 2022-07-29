import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-settings-header',
  templateUrl: './settings-header.component.html',
  styleUrls: ['./settings-header.component.scss']
})
export class SettingsHeaderComponent implements OnInit {
	@Output() btnClick = new EventEmitter();
  @Output() btnClickSwitchToCard = new EventEmitter();
  @Input()  showSearch:Boolean=true;
  //@Input() showDropDown:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }
  onClick() {
		this.btnClick.emit();
	}
  onClickSwitchToCard() {
		this.btnClickSwitchToCard.emit();
	}

}
