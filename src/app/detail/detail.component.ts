import {Component, OnInit} from '@angular/core';
import {TempService} from '../temp.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  public count = 0;
  public name;
  public names: string[];
  constructor(private tempService: TempService) {
  }

  ngOnInit(): void {
  }

  public showName(){
    this.name = "Thet min wai";
    this.count++;
    this.names = this.tempService.getAll();
    console.log("here");
    // this.tempService.getMain().subscribe(x => {
    //   console.log(x);
    // });
    this.tempService.get("http://localhost:8080/khayayphyu-application/customer/boId/CUSTOMER00000001").subscribe(x => console.log(x));
  }

  public show() {
    this.count++;
  }

}
