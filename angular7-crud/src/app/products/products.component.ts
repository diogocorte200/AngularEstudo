import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

// displayedColumns: string[] = ['clienteId','nome', 'email', 'sobrenome', 'ativo'];
displayedColumns: string[] = ['clienteId','nome', 'sobrenome', 'email', 'dataCadastro', 'ativo'];
data: Product[] = [];
isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getProducts()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
