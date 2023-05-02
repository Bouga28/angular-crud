import { Resource } from "./resource";



export class PaginatedResource {
    current_page: number =0;
    data: Resource[]=[];
    from: number =0;
    last_page: number =0;
    next_page_url: string='';
    path: string='';
    per_page: number =0;
    prev_page_url: string='';
    to: number=0;
    total: number=0;
  }
