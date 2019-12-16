import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  myform:FormGroup;
  deviceform:FormGroup;
  product:any;
  constructor(public fb:FormBuilder, public http:HttpClient) { }

  ngOnInit() {
    this.deviceform=this.fb.group({
      '_id':[null, Validators.required],
      'name':[null,Validators.required],
      'description':[null,Validators.required],
      'qty':[null,Validators.required]
    })
  }

  editdevices(id:string): void{
    let thisObj:any = this;
   this.http.get("http://localhost:3000/products"+id).subscribe(function(p2){
     var pro=JSON.parse(JSON.stringify(p2))
     thisObj.deviceform.setvalues({
       "id":pro._id,
       "name":pro.name,
       "description":pro.description,
       "qty":pro.quantity

     })
   })

  }
  private loadList():void{
    this.http.get("http://localhost:3000/products/").subscribe(p2 => {
      this.product = p2;
    })
  }

  deletedevices(id:string):void{
    let thisObj:any=this;
    this.http.delete("http://localhost:3000/products"+id).subscribe(function(p2){
      alert("deleted succesfully");
      thisObj.loadList();
    })

  }
  savedevices(form:any){
    let thisobj:any=this;
    alert(JSON.stringify(form))
     
    if(form._id==undefined){
      this.http.post("http://localhost:3000/products", form).subscribe(function(p2){
              this.product=p2;
              thisobj.loadList();
      })
    }
    else{
      this.http.post("http://localhost:3000/products", form).subscribe(function(p3){
        this.deviceform.setvalues({
          "id":null,
          "name":null,
          "description":null,
          "qty":null
        })
        thisobj.loadList();
      })
    }
  }
}
