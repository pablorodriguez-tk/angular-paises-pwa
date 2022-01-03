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

  getPaisPorId(id: string) {
    if (this.paises.length > 0) {
      //hay paises en el arreglo
      const pais = this.paises.find((p) => p.cca3 === id);
      return Promise.resolve(pais);
    }
    return this.getPaises().then((paises) => {
      const pais = this.paises.find((p) => p.cca3 === id);
      return Promise.resolve(pais);
    });
  }
}
