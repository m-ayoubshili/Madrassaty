import { Component, OnInit } from '@angular/core';
import { TajwidErrorService } from 'src/app/services/tajwid-error/tajwid-error.service';
import { NestableSettings } from 'ngx-nestable/lib/nestable.models';


@Component({
  selector: 'app-tajwid-error',
  templateUrl: './tajwid-error.component.html',
  styleUrls: ['./tajwid-error.component.scss']
})



export class TajwidErrorComponent implements OnInit {
  tajwidErrorData;

  constructor( private tajwidErrorService: TajwidErrorService) { }

  ngOnInit(): void {
    this.tajwidErrorService.getTajwidErrors().subscribe(
      TajwidErrorData => {
      this.tajwidErrorData=TajwidErrorData
      },
    );
  }
  public options = {
    fixedDepth: false
  } as NestableSettings;
  public drag(e) { }
  public drop(e) { }
}
