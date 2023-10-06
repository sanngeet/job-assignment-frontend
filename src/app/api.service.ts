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
    const body = JSON.stringify(req);

    let api = this.apiUrl + '/steps';

    let res = this.http.post(api, body, httpOptions);
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

    let api = this.apiUrl + 'steps';

    let res = this.http.put(api, { id: req.id, step: req.step }, httpOptions);
    return res;
  }

  deleteStep(req: any) {
    const httpOptions = {
      withCredentials: true,
    };

    const body = JSON.stringify(req);

    let api = this.apiUrl + '/steps/' + req.stepId;
    let res = this.http.post(api, body, httpOptions);
    return res;
  }

  createItem(req: any) {
    const httpOptions = {
      withCredentials: true,
    };
    const body = JSON.stringify(req);

    let api = this.apiUrl + '/items';

    let res = this.http.post(api, body, httpOptions);
    return res;
  }

  updateItem(req: any) {
    const httpOptions = {
      withCredentials: true,
    };
    const body = JSON.stringify(req);

    let api = this.apiUrl + '/item';

    let res = this.http.post(api, body, httpOptions);
    return res;
  }

  deleteItem(req: any) {
    const httpOptions = {
      withCredentials: true,
    };

    const body = JSON.stringify(req);

    let api = this.apiUrl + '/items/' + req.itemId;
    let res = this.http.post(api, body, httpOptions);
    return res;
  }
}
