import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from './../../Services/ui.service';
import {Task} from '../../Task'
import {Subscription} from 'rxjs';
import { v4 as uid } from 'uuid';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  id: string;
  text: string;
  day: string;
  time: string;
  reminder: boolean = false;
  showAddTask: boolean;
  subscription: Subscription;
  
  constructor(private uiService: UiService) {   
      this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value)
  }

  ngOnInit(): void {
  }
  onSubmit(){
    if(!this.text || !this.day || !this.time){
      alert("Incomplete Inputs!");
      return;
    }

    const newTask = {
      id: Math.random().toString(),
      text: this.text,
      day: this.day,
      time: this.time,
      reminder: this.reminder
    }
    this.onAddTask.emit(newTask);
    this.id = this.generateUID(),
    this.text = ' ';
    this.day = ' ';
    this.time = ' ';
    this.reminder = false;
  }

  generateUID(): string {
    return uid().toString().replace(/-/g, '').substring(0, 27);
}
}
