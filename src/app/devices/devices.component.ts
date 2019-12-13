import { Component, OnInit,ReflectiveInjector } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  myForm:FormGroup
  device:any;
  deviceForm:FormGroup
  sku = "test"
  injector:any
  taxPrice: number  
  devices:any;
  constructor(private fb:FormBuilder,public http:HttpClient){    
  }

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
        thisObj.loadList();
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