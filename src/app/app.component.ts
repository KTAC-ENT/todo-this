import {Component, OnInit} from '@angular/core';
import {Todo} from './data/Todo';
import {v4 as uuidv4} from 'uuid';
import {DialogDeleteComponent} from './dialog-delete/dialog-delete.component';
import {MatDialog} from '@angular/material/dialog';
import Localbase from 'localbase';
const db = new Localbase('tododb');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  taskToAdd: string;
  finishAt: Date;

  COLECT_NAME = 'todos';

  allMyTask: Todo[] = [];

  taskString: any = [];

  constructor(public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.created();
  }

  add(): void {
    const newTodo = new Todo();
    newTodo.id = uuidv4();
    newTodo.name = this.taskToAdd;
    newTodo.done = false;
    newTodo.finishAt = this.finishAt ? this.finishAt : null;
    newTodo.createdAt = new Date();
    db.collection(this.COLECT_NAME).add(newTodo);
    this.allMyTask.push(newTodo);
    this.taskToAdd = null;
    this.finishAt = null;
  }

  delete(taskId: string) {
    const index = this.allMyTask.findIndex(task => task.id === taskId);
    this.allMyTask.splice(index, 1);
    db.collection(this.COLECT_NAME).doc({id: taskId}).delete();
  }

  toggleDone(taskId: string) {
    const task = this.allMyTask.find(item => item.id === taskId);
    db.collection(this.COLECT_NAME).doc({id: taskId}).update({
      done: !task.done
    });
    task.done = !task.done;
  }

  openDialog(data: Todo): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '450px',
      data: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(data.id);
      }
    });
  }

  getTodos() {
    db.collection(this.COLECT_NAME).get().then(
      tasks =>  {
        this.allMyTask = tasks;
      }
    ).catch(error => {
      console.log(error);
    });
  }

  created() {
    this.getTodos();
  }

}
