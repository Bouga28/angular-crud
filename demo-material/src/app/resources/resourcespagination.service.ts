
import { Injectable } from '@angular/core';




import { PaginatedResource } from './paginated-resource';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourcespaginationService {

    public isLoading: boolean = false;
    constructor(private http: HttpClient) { }
    
    getResources(): Promise<PaginatedResource>{
      console.log("GET RESOURCES WITH PAGIMATION...... ");
        this.isLoading = true;
        return this.http.get('http://127.0.0.1:8000/api/resources')
        .toPromise()
        .then((response) => {
          console.log("RESPONSE : ", response);
            this.isLoading = false;
            return response  as PaginatedResource
        })
        .catch(this.handleError);
    }

    getResourcesAtUrl(url: string): Promise<PaginatedResource>{
      this.isLoading = true;
      return this.http.get(url)
      .toPromise()
      .then((response) => {
          this.isLoading = false;
          return response as PaginatedResource
      })
      .catch(this.handleError);
  }




    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      this.isLoading = false;
      return Promise.reject(error.message || error);
  }
}
