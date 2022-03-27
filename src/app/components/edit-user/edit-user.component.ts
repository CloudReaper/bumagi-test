import { UsersService } from '../../users.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  EditFormControlGroup: FormGroup;
  @Input() value: number;
  statusList = [
    { value: 0, name: 'Подписка активна' },
    { value: 1, name: 'Подписка приостановлена' },
    { value: 2, name: 'Подписка заблокирована' },
  ];

  selectedStatus: number = this.data.status;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      fname: string;
      name: string;
      mname: string;
      status: number;
      id: number;
      avatar: string;
      balance: number;
    },
    private usersService: UsersService,
    private fb: FormBuilder,
    public dialogref: MatDialogRef<EditUserComponent>
  ) {}

  ngOnInit(): void {
    this.EditFormControlGroup = this.fb.group({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.minLength(2),
      ]),
      fname: new FormControl(this.data.fname, [
        Validators.required,
        Validators.minLength(2),
      ]),
      mname: new FormControl(this.data.mname, [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  setStatus(status: number) {
    this.selectedStatus = status;
  }

  getDefaultOption() {
    return this.statusList.find((status) => status.value === this.data.status);
  }

  getNameInput(): string {
    return this.EditFormControlGroup.get('name').value;
  }
  getfNameInput(): string {
    return this.EditFormControlGroup.get('fname').value;
  }
  getmNameInput(): string {
    return this.EditFormControlGroup.get('mname').value;
  }

  getPayload() {
    let payload = {};

    if (this.data.fname !== this.getfNameInput())
      payload['fname'] = this.getfNameInput();
    if (this.data.name !== this.getNameInput())
      payload['name'] = this.getNameInput();
    if (this.data.mname !== this.getmNameInput())
      payload['mname'] = this.getmNameInput();
    if (this.data.status !== this.selectedStatus)
      payload['status'] = this.selectedStatus;

    return payload;
  }

  onSubmit() {
    let payload = this.getPayload();
    if (this.EditFormControlGroup.valid && payload !== {}) {
      this.usersService.updateUser(this.data.id, payload).subscribe();
      this.dialogref.close({
        id: this.data.id,
        fname: this.getfNameInput(),
        name: this.getNameInput(),
        mname: this.getmNameInput(),
        status: this.selectedStatus,
        lastUpdatedAt: Date.now(),
        avatar: this.data.avatar,
        balance: this.data.balance,
      });
    }
  }
}
