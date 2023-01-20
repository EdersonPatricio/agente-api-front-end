import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/agente-api/processarArquivos`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  consultarSiglasRegioes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/agente-api/consultarSiglasRegioes`);
  }
  
  consultarPorRegiaoEstruturaTabela(sigla: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/agente-api/consultarPorRegiaoEstruturaTabela/${sigla}`);
  }
}
