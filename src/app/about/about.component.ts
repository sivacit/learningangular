import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  category =""
  product = ""
  constructor(private route: ActivatedRoute, private router: Router) { 
    route.params.subscribe(params => { 
      this.category = params['category']; 
      this.product = params['product']; 
    });
  }

  ngOnInit() {
  }

  gotoHome(){
    this.router.navigateByUrl('home');
  }
}
