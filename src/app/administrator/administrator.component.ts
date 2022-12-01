import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss'],
})
export class AdministratorComponent implements OnInit {
  usersList = [
    'Иванов Иван Иванович',
    'Иванов Иван Иванович',
    'Иванов Иван Иванович',
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович",
    "Иванов Иван Иванович"
  ];
  constructor() {}

  ngOnInit(): void {}
}
