// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class PriceService {
  constructor() { }
  calculateTax(price:number):number{  
    return (Number(price) + 20)
  }
}
