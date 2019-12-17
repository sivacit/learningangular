import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  empForm: FormGroup
  employee: any

  constructor(private fb: FormBuilder, public http: HttpClient) {
  }

  private loadList(): void {
    this.http.get("http://localhost:3000/employee/").subscribe(emp => {
      this.employee = emp;
    })
  }

  ngOnInit() {
    this.empForm = this.fb.group({
      '_id': [null, Validators.required],
      'empName': [null, Validators.required],
      'empRole': [null, Validators.required],
      'empSal': [null, Validators.required]
    })

    this.loadList();
  }

  saveEmp(form: any): void {
    let thisObj: any = this;
    if (form._id == undefined) {
      this.http.post("http://localhost:3000/employee", form).subscribe((emp) => {
        this.employee = emp;
        thisObj.loadList();
      })
    }
    else {
      this.http.put("http://localhost:3000/employee/", form).subscribe((emp) => {
        thisObj.empform.setValue({
          "_id": null,
          "empName": null,
          "empRole": null,
          "empSal": null
        })
        thisObj.loadList();
      })

    }
  }

}
