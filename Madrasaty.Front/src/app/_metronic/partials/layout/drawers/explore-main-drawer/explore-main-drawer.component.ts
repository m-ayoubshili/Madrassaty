import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { LayoutService } from 'src/app/_metronic/layout';
import { environment } from '../../../../../../environments/environment';
type Tabs = 'Header' | 'Toolbar' | 'PageTitle' | 'Aside' | 'Content' | 'Footer';

@Component({
  selector: 'app-explore-main-drawer',
  templateUrl: './explore-main-drawer.component.html',
})

export class ExploreMainDrawerComponent implements OnInit {
  appPurchaseUrl: string = environment.appPurchaseUrl;
  appPreviewUrl: string = environment.appPreviewUrl;
  @Input() template: string;
  @Input() functionality: string;
  @Input() id: string;
  activeTab: Tabs = 'Header';
  model: any;
  @ViewChild('form', { static: true }) form: NgForm;
  configLoading: boolean = false;
  resetLoading: boolean = false;


  constructor() {
  
  }

  ngOnInit(): void {


  }





}

