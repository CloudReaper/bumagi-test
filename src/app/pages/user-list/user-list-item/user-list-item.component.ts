import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { EditUserComponent } from '../../../components/edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss'],
})
export class UserListItemComponent implements OnInit {
  DateNow: Date;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.DateNow = new Date();
   
  }

  getLastEditTime(date) {
    let lastUpdateDate = Date.parse(date);
    let SecondsBetween = (this.DateNow.getTime() - lastUpdateDate) / 1000;
    return this.formatLastEditTime(SecondsBetween);
  }

  formatLastEditTime(time: number) {
    time = Math.round(Math.abs(time));
    let seconds = time % 60;
    let minutes = Math.floor(time / 60) % 60;
    let hours = Math.floor(time / 3600);
    if (minutes > 0 && hours === 0)
      return `Последнее изменение: ${minutes} минут ${seconds} назад`;
    if (hours > 0)
      return `Последнее изменение: ${hours} часов ${minutes} минут ${seconds} назад`;
    return `Последнее изменение: ${time} секунд назад`;
  }

  formatBalance() {
    let BalanceString = this.user.balance.toFixed(2).trim();
    let parts = BalanceString.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  }

  getUserStatus() {
    switch (this.user.status) {
      case 0:
        return 'Активен';
      case 1:
        return 'Приостановлен';
      case 2:
        return 'Заблокирован';
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(EditUserComponent, {
      maxHeight: '58vh',
      maxWidth: '62vw',
      width: '100%',
      height: '100%',
      panelClass: 'custom-dialog-container',
      data: {
        fname: this.user.fname,
        name: this.user.name,
        mname: this.user.mname,
        status: this.user.status,
        id: this.user.id,
        avatar:this.user.avatar,
        balance:this.user.balance
      },
    }).afterClosed().subscribe(user => {
      this.user = user
    });
  }

  @Input() user: User;
}
