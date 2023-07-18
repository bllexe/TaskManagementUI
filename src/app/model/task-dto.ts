import { CategoryDto } from "./category-dto";

export interface TaskDto {
  id?: number;
  title?: string;
  description?: string;
  status?:string,
  severity?:string
  createDate?: string,
  category?: CategoryDto;
}