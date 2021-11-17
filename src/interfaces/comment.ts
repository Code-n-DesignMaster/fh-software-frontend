export interface IComment {
  _id: string;
  objectId: string;
  content?: string;
  creator?: any;
  type?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ICreateComment {
  objectId: string;
  content: string;
  type?: string;
}