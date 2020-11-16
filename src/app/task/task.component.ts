import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Task } from '../app.component';
@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})

export class TaskComponent implements OnInit {
    @Input() title: Task;
    @Output() deleteById: EventEmitter<string> = new EventEmitter();
    @Output() makeDoneById: EventEmitter<string> = new EventEmitter();
    @Output() changeById: EventEmitter<string> = new EventEmitter();

    ngOnInit() {}
    makeDone(id) {
        this.makeDoneById.emit(id);
    }
    deleteTask(id) {
        this.deleteById.emit(id);
    }
    changeTask(id) {
        this.changeById.emit(id);
    }

}
