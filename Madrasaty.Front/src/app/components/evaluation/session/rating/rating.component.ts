import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input('rating')  rating: number = 3;
  @Input('starCount')  starCount: number = 5;

  @Output() private ratingUpdated = new EventEmitter();
   ratingArr = ['Innacceptable','Faible','Moyen', 'Bien', 'Très Bien'];

  constructor() {
  }


  ngOnInit() {

  }
  onClick(rating:number) {
    console.log(rating)
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}



