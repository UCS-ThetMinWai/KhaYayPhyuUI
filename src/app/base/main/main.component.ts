import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  activeElement = null;

  @Output()
  update = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  public updateActive(component, type) {
    this.activeElement = component;
    this.update.emit(type);
  }

}
