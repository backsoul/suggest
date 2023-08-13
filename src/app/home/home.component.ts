import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public products:any = []

  constructor(public httpClient: HttpClient, private route:Router){}

  ngOnInit(){
    this.httpClient.get('http://localhost:5000/products').subscribe((res: any)=>{
            this.products = res;
        });
  }

  goToDetail(name: string){
    this.route.navigate([name])
  }
}
