import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
      console.log(tasks);
    }
    return tasks;
  }

  getTaskById(id_tasks: string): Task {
    return this.tasks.find((task) => task.id === id_tasks);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  updateTask(
    id_task: string,
    createTaskDto: CreateTaskDto,
    status: TaskStatus,
  ): Task {
    const { title, description } = createTaskDto;
    const task = this.getTaskById(id_task);

    if (task) {
      task.title = title;
      task.description = description;
      task.status = status;
      return task;
    }
  }

  deleteTaskById(id_task: string): Task {
    const index = this.tasks.findIndex((task) => task.id === id_task);
    if (index > -1) {
      this.tasks.splice(index, 1);
      return null;
    }
  }
}
