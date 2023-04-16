import { Owner } from "./owner";
export interface IRepository {
  id: number;
  url: string;
  html_url: string;
  name: string;
  full_name: string;
  owner: Owner;
}
