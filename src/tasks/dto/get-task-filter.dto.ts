import { TaskStatus } from '../tasks.model';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTaskFilterDto {
  @IsOptional()
  @IsIn([
    TaskStatus.DONE,
    TaskStatus.ERROR,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ])
  status: TaskStatus;

  @IsOptional()
  search: string;
}
