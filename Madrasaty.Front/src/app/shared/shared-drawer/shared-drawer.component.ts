
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shared-drawer',
  templateUrl: './shared-drawer.component.html',
  styleUrls: ['./shared-drawer.component.scss']
})
export class SharedDrawerComponent implements OnInit {

  @Input() template: TemplateRef<any>;
  @Input() fonctionality: string;

   constructor() {

    }
  ngOnInit(): void { 
  }
}
