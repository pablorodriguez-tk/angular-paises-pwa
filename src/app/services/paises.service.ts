import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaisInterface } from 'src/app/interfaces/pais.interface';

@Injectable({
  providedIn: 'root',
})
export class PaisesService {
  private paises: PaisInterface[] = [];
  constructor(private http: HttpClient) {}

  getPaises(): Promise<PaisInterface[]> {
    if (this.paises.length > 0) {
      return Promise.resolve(this.paises);
    }
    return new Promise((resolve) => {
      this.http
        .get('https://restcountries.com/v3.1/lang/spa')
        .subscribe((paises) => {
          console.log(paises);
          this.paises = <PaisInterface[]>paises;
          resolve(<PaisInterface[]>paises);
        });
    });
  }
}
