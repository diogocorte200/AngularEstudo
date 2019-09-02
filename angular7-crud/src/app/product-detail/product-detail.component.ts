import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})


export class ProductDetailComponent implements OnInit {
  product: Product = { clienteId: null, nome: '', sobrenome: '', email: '', dataCadastro: '', ativo: true };
  isLoadingResults = true;

  pproduct: Product [] = []

  private productos: Product[];

  @ViewChild("contatoForm") contatoForm: NgForm;
 
   
  
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getProductDetails(this.route.snapshot.params['id']);
   }


  getProductDetails(id) {
    this.api.getProduct(id)
      .subscribe(data => {
        this.product = data;
        console.log(this.product);
        this.isLoadingResults = false;
      });
  }

  deleteProduct(id) {
    this.isLoadingResults = true;
    this.api.deleteProduct(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  listarPorId(product){
    this.api.listarPorId(product.clienteId).subscribe(dados => this.productos = dados)
  }

  onDelete(produto: Product): void{
    this.api.confirm('Deseja realmente excluir este cliente' + produto.nome + '?')
    .then((podeDeletar: boolean) => {
      if(podeDeletar){
        this.api.delete(produto)
        .then(() => {
          this.pproduct = this.productos.filter((c:Product) => c.clienteId != produto.clienteId);  
        })
        .catch(err => {
          console.log(err);
        });
      }   
  });
  }
}
