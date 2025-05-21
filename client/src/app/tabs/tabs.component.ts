import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css'
})
export class TabsComponent {

  @Input() tabs: { label: string }[] = [];
  @Input() currentTabIndex: number = 0;
  @Output() select = new EventEmitter<number>();
  @Output() close = new EventEmitter<number>();
  @Output() add = new EventEmitter<void>();

  selectTab(index: number) {
    this.select.emit(index);
  }
}
