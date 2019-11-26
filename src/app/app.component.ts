import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PriceService} from './price.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component1.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  myForm:FormGroup
  sku = "test"
  ps:PriceService
  taxPrice: number  

  constructor(fb:FormBuilder){  
    this.ps = new PriceService()

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
    this.taxPrice = this.ps.calculateTax(form.sku)   
  }
  onSumbit(price:number): void{    
    console.log("you have submitted from form builder ", this.taxPrice) 
   }
}
