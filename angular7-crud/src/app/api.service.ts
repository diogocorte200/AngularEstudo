import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Headers, Http } from '@angular/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';
import { promise } from 'protractor';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "/api/v1/products";



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private header: Headers = new Headers({'Content-Type' : 'application/json'})
 

  constructor(private http: HttpClient, private _http: Http) { }

  url = 'http://localhost:53291/api/cliente/ConsultarCliente';
  contatosUrl = 'http://localhost:53291/api/cliente/ConsultarCliente';
  urlAlterar = "http://localhost:53291/api/cliente/AlterarCliente/";
  caminho = "http://localhost:53291/api/cliente/AlterarCliente/"
  urlBId = 'http://localhost:53291/api/cliente/ConsultarClientePorId/';
  urlDel = 'http://localhost:53291/api/cliente/DeleteUsuario/';
  urlNovo = 'http://localhost:53291/api/cliente/CadastrarCliente';


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  getProducts (): Observable<Product[]> {
    return this.http.get<Product[]>(this.url)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }
  
  getProduct(clienteId: number): Observable<Product> {
    const url = `${this.urlBId}${clienteId}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${clienteId}`)),
      catchError(this.handleError<Product>(`getProduct id=${clienteId}`))
    );
  }
  
  addProduct (product): Observable<Product> {
    return this.http.post<Product>(this.urlNovo, product, httpOptions).pipe(
      tap((product: Product) => console.log(`added product w/ id=${product.clienteId}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }
  
  updateProduct (product): Observable<any> {
    const url = `${this.caminho}/${product}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${product.clienteId}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  
  alterar(product){
    var params = JSON.stringify(product);
    var cabe = new Headers();
    var teste = this.http.put(this.urlAlterar, product);
      teste = teste;
    return this.http.put(this.urlAlterar, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${product.clienteId}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
    }
  deleteProduct (id): Observable<Product> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Product>(this.urlDel, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  listarPorId(contatos){
    return this.http.get<any[]>(this.urlBId + contatos.clienteId); 
   } 

   confirm(message? : string){
     return new Promise(resolve => {
       return resolve(window.confirm(message || 'Confirma ?'));
     });
   }

   
private tratarErro(err: any): Promise<any>{
  return Promise.reject(err.message || err);
}

   delete(produto: Product): Promise<Product>{
     const url = `${this.urlDel}${produto.clienteId}`;
     return this._http.delete(url, {headers:this.header})
     .toPromise()
     .then(() => produto as Product)
     .catch(this.tratarErro);
   }
   
}
