import { Component, OnInit,ReflectiveInjector } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PriceService} from './price.service'
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router } from '@angular/router';

@Component({
  selector: 'app-root',
  // templateUrl: './devices.html',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  
  myForm:FormGroup
  device:any;
  deviceForm:FormGroup
  sku = "test"
  injector:any
  taxPrice: number  
  devices:any;
  constructor(private fb:FormBuilder,public http:HttpClient){  
    this.myForm = this.fb.group({
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
  
}