import { Component, OnInit,ReflectiveInjector } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PriceService} from './price.service'
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component1.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  myForm:FormGroup
  sku = "test"
  injector:any
  taxPrice: number  
  read_from_server = "";
  constructor(fb:FormBuilder, private ps:PriceService, http:HttpClient){  
    // this.ps = new PriceService()
    // this.injector = ReflectiveInjector.resolveAndCreate([PriceService])
    // this.ps = this.injector.get(PriceService)
    http.get("http://localhost:3000/").subscribe(data => {
      this.read_from_server = data.message.toString();
    })
    this.myForm = fb.group({
      "sku":['adsfsdfsdfC123', Validators.required]
    })
  }

  title = 'firstApp';
  selva = "delux"
  data = {
    "admin": "true",
    "salary": 2000,
    "sex": "Male",
    "category":"super-delux"
  }
  colorRed = "red"
  cities = ["Chennai", "Madurai", "Coimbatore"]
  isMale():boolean {
    return !(this.data.sex == "Male")    
  };

  getGender():string {
    if(this.data.sex == "Male"){
      return "male";
    }
    else{
      return "female";
    }
  };
  ngOnInit(){

  }
  onTestSumbit(form:any): void{
    this.taxPrice = this.ps.calculateTax(form.sku, 28)   

  }
  onSumbit(price:number): void{    
    console.log("you have submitted from form builder ", this.taxPrice) 
   }

}
