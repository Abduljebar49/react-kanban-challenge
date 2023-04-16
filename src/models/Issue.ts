import { IssueUser } from "./User";

export interface IIssue {
  author_association: string;
  comments: number;
  created_at: Date;
  id: number;
  number: number;
  state: string;
  title: string;
  user: IssueUser;
}