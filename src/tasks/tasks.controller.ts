import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() createTaskDto: CreateTaskDto,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateTask(id, createTaskDto, status);
  }
  @Delete(':id')
  deleteTaskById(@Param('id') id: string): void {
    this.taskService.deleteTaskById(id);
  }
}
