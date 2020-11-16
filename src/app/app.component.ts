import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { element } from 'protractor';

import { v4 as uuid } from 'uuid';
export interface Task {
  id: string;
  name: string;
  isDone: boolean;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [{ id: uuid(), name: "Learn Angular", isDone: false }];
  taskId: string;
  task: string;
  selectedTaskId: string;
  taskForm: FormGroup;

  ngOnInit() {
    this.taskForm = new FormGroup({
      taskInput: new FormControl(null, Validators.required)
    });
  }
  addTask() {
    const name = this.taskForm.value.taskInput;
    const isDuplicated = this.tasks.some(elem => elem.name === name);
    if (name && !isDuplicated) {
      const id = uuid();
      const task = { name, id, isDone: false };
      this.tasks.push(task);
      this.taskForm.setValue({ taskInput: null });
    }
  }
  clearList() {
    this.tasks = [];
  }
  deleteById(id) {
    this.tasks = this.tasks.filter(elem => elem.id !== id);
  }
  makeDoneById(id) {
    this.tasks = this.tasks.map(elem => {
      if (elem.id === id) {
        elem.isDone = true;
      }
      return elem;
    })
  }
  changeById(id) {
    this.tasks.forEach(elem => {
      if (elem.id === id) {
        this.taskForm.setValue({ taskInput: elem.name });
      }
    });
    this.taskId = id;
  }
  clearCompletedList() {
    this.tasks = this.tasks.filter(elem => !elem.isDone);
  }
  updateTask() {
    const name = this.taskForm.value.taskInput;
    this.tasks = this.tasks.map(elem => elem.id === this.taskId ? {...elem, name} : elem);
    this.taskForm.reset();
    this.taskId = '';
  }
}
