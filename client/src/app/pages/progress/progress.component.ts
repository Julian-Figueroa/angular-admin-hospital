import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {
  
  percentage: number = 50;

  constructor() { }

  ngOnInit() {
  }

}
