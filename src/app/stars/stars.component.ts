import { Component, OnInit,Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.less']
})
export class StarsComponent implements OnInit,OnChanges {
  @Input()
  protected rating:number = 0;
  @Output()
  private ratingChange:EventEmitter<number> = new EventEmitter()
  protected starts: boolean[];
  @Input()
  private readonly:boolean = true;
  constructor() { }

  ngOnInit() {
    
  }
  ngOnChanges(){
    this.starts = [];
    for (let i = 1; i <= 5; i ++) {
      this.starts.push(i > this.rating);
    }
  }
  clickStar(index:number) {
    if(!this.readonly) {
      this.rating = index +1;
      this.ratingChange.emit(this.rating)
    }
  }
}