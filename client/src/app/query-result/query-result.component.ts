import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-query-result',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './query-result.component.html',
  styleUrl: './query-result.component.css'
})
export class QueryResultComponent {
  @Input() rows: any[] = [];
  @Input() columns: string[] = [];
}
