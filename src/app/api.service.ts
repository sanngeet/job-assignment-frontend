import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  private apiUrl = environment.apiUrl;

  steps() {
    let res = this.http.get(this.apiUrl, {});
    return res;
  }

  createStep(req: any) {
    const httpOptions = {
      withCredentials: true,
    };

    let api = this.apiUrl + '/steps';

    let res = this.http.post(api, req, httpOptions);
    return res;
  }

  // todo not used
  updateStep(req: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }),

      withCredentials: true,
    };

    let api = this.apiUrl + 'steps/' + req.id;

    let res = this.http.put(api, { step: req.step }, httpOptions);
    return res;
  }

  deleteStep(req: any) {
    const httpOptions = {
      withCredentials: true,
    };

    let api = this.apiUrl + '/steps/' + req.stepId;
    let res = this.http.delete(api, httpOptions);
    return res;
  }

  createItem(req: any) {
    const httpOptions = {
      withCredentials: true,
    };

    let api = this.apiUrl + '/items';

    let res = this.http.post(api, req, httpOptions);
    return res;
  }

  updateItem(req: any) {
    const httpOptions = {
      withCredentials: true,
    };

    let api = this.apiUrl + '/items/' + req.item_id;

    let res = this.http.put(api, req, httpOptions);
    return res;
  }

  deleteItem(req: any) {
    const httpOptions = {
      withCredentials: true,
    };

    let api = this.apiUrl + '/items/' + req.itemId;
    let res = this.http.delete(api, httpOptions);
    return res;
  }
}
