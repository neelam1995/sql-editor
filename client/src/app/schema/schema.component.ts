import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-schema',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schema.component.html',
  styleUrl: './schema.component.css'
})
export class SchemaComponent {
  @Input() schema: { [key: string]: string[] } = {};
  @Output() tableSelected = new EventEmitter<string>();

  selectTable(table: string) {
    this.tableSelected.emit(table);
  }
}
