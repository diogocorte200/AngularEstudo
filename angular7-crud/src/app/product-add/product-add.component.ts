import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

  
productForm: FormGroup;
nome:string='';
email:string='';
clienteId:number=null;
datacadastro:string=null;
sobrenome:string=null;
ativo:boolean=true
isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }


  ngOnInitNovo() {
    this.productForm = this.formBuilder.group({
      'nome' : [null, Validators.required],
      'email' : [null, Validators.required],
      'sobrenome' : [null, Validators.required],
      'ativo' : [null, Validators.required],
      'dataCadastro' : [null, Validators.required]
 });
 }

 


  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'nome' : [null, Validators.required],
      'email' : [null, Validators.required],
      'sobrenome' : [null, Validators.required],
      'ativo' : [null, Validators.required],
      'dataCadastro' : [null, Validators.required]
    });
  }


  addProdutoNovo(form: NgForm) {
    this.isLoadingResults = true;
    alert("Seus dados forma salvos com sucesso!");
    this.api.addProduct(form)
      .subscribe(res => {
          const id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/produto-detalhe', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }







  onFormSubmit(form:NgForm) {
    this.isLoadingResults = true;
    this.api.addProduct(form)
      .subscribe(res => {
          let id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/product-details', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
