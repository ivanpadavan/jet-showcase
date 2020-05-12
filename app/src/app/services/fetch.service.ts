import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModelDescription } from './jet.interfaces';

export const P = '/api';

@Injectable({providedIn: 'root'})
export class FetchService {
  constructor(private http: HttpClient) {
  }

  getModelDescriptions(): Observable<ModelDescription[]> {
    return this.http.get<ModelDescription[]>(`${P}/model_descriptions/`);
  }
}
