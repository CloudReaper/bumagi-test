import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  selectedOption
  menuOpened: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.selectedOption = this.defaultOption
    
  }

  openDropdown() {
    this.menuOpened = !this.menuOpened;
  }

  setSelectedOption(option:number) {
    this.selectedOption = this.optionList.find(status => status.value === option)
    this.selectedOptionEvent.emit(option)
    this.menuOpened = false;

  }
  @Input() optionList
  @Input() defaultOption
  @Output() selectedOptionEvent: EventEmitter<number> = new EventEmitter<number>()

}
