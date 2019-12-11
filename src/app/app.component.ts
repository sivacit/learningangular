import { Component, OnInit,ReflectiveInjector } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PriceService} from './price.service'
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './devices.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  myForm:FormGroup
  device:any;
  deviceForm:FormGroup
  sku = "test"
  injector:any
  taxPrice: number  
  devices:any;
  constructor(private fb:FormBuilder, private ps:PriceService,public http:HttpClient){  
    // this.ps = new PriceService()
    // this.injector = ReflectiveInjector.resolveAndCreate([PriceService])
    // this.ps = this.injector.get(PriceService)
    
    
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
  private loadList():void{
    this.http.get("http://localhost:3000/devices/").subscribe(d2 => {
      this.devices = d2;
    })
  }
  ngOnInit(){
    this.deviceForm = this.fb.group({
      "_id": [null, Validators.required],
      "name": [null, Validators.required],
      "description": [null]
    })
    this.loadList();
  }
  
  onTestSumbit(form:any): void{
    this.taxPrice = this.ps.calculateTax(form.sku, 28)   

  }
  onSumbit(price:number): void{    
    console.log("you have submitted from form builder ", this.taxPrice) 
   }
  deleteDevice(id:string): void{
    let thisObj:any = this;
    this.http.delete("http://localhost:3000/devices/" + id).subscribe(function(d2) {      
      alert("Device deleted successfully!")
      thisObj.loadList();
    })
    
  }
  loadDevice(id:string): void{
    let thisObj:any = this;
    this.http.get("http://localhost:3000/devices/" + id).subscribe(function(d2) {  
      var dev = JSON.parse(JSON.stringify(d2))            
      thisObj.deviceForm.setValue({
        "_id": dev._id,
        "name": dev.name,
        "description": dev.description
      })            
    })
  }
  saveDevices(form:any): void{
    let thisObj:any = this;
    if (form._id == undefined){
      this.http.post("http://localhost:3000/devices", form).subscribe(function(d2) {      
        this.devices = d2
      })
    }
    else{
      this.http.put("http://localhost:3000/devices/" + form._id, form).subscribe(function(d2) {      
        thisObj.deviceForm.setValue({
          "_id": null,
          "name": null,
          "description": null
        })   
        thisObj.loadList();
      })
      
    }
    
   }
}