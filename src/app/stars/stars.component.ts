import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.less']
})
export class StarsComponent implements OnInit {
  protected starts: boolean[];
  @Input()
  protected rating = 0;
  constructor() { }

  ngOnInit() {
    this.starts = [];
    for (let i = 1; i <= 5; i ++) {
      this.starts.push(i > this.rating);
    }
  }

}