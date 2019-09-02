import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from '../product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {


  produto : Product = {};



productForm: FormGroup;
_id:string='';
nome:string='';
email:string='';
clienteId:number=null;
isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    }

   getProduct(id) {
     this.api.getProduct(id)
     .subscribe(res => {
       this.produto = res;
       console.log(this.produto)
       this.produto = res    
       this.isLoadingResults = false;  
      },
      err => {
        this.isLoadingResults = false;
      }
      )}


  onFormSubmit(form:NgForm) {
    var id = this.route.snapshot.params['id'];
    this.isLoadingResults = true;
    this.api.alterar(form)
      .subscribe(res => {
          let id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/product-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  productDetails() {
    this.router.navigate(['/product-details', this.clienteId]);
  }

}
