import { TaskDto } from "./task-dto";
import { UserDto } from "./user-dto";

export interface CategoryDto {
  id?: number;
  name?: string;
  user?: UserDto;
  todoList?: Array<TaskDto>;
}