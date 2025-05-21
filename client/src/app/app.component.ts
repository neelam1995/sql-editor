import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TabsComponent } from './tabs/tabs.component';
import { SchemaComponent } from './schema/schema.component';
import { QueryResultComponent } from './query-result/query-result.component';
import { HistoryComponent } from './history/history.component';
import { SavedComponent } from './saved/saved.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    TabsComponent,
    SchemaComponent,
    QueryResultComponent,
    HistoryComponent,
    SavedComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tabs = [{ label: 'Tab 1', query: '' }];
  currentTabIndex = 0;
  results: any[] = [];
  columns: string[] = [];
  schema: { [key: string]: string[] } = {};
  history: string[] = [];
  savedQueries: { name: string; sql: string }[] = [];
  newQueryName = '';
  loading = false;
  error: string | null = null;

  presetQueries = [
    { label: 'All Users', sql: 'SELECT * FROM users;' },
    { label: 'Create Table', sql: 'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT);' },
    { label: 'Insert Sample', sql: "INSERT INTO users (name) VALUES ('Alice');" }
  ];

  constructor(private http: HttpClient) {
    this.fetchSchema();
  }

  get sqlQuery() {
    return this.tabs[this.currentTabIndex].query;
  }

  set sqlQuery(value: string) {
    this.tabs[this.currentTabIndex].query = value;
  }

  fetchSchema() {
    this.http.get<any>('http://localhost:3001/api/schema').subscribe({
      next: (res) => this.schema = res.schema || {},
      error: () => this.schema = {}
    });
  }

  runQuery() {
    this.loading = true;
    this.http.post<any>('http://localhost:3001/api/query', { sql: this.sqlQuery }).subscribe({
      next: (res) => {
        this.results = res.rows;
        this.columns = Object.keys(this.results[0] || {});
        this.error = null;
        this.loading = false;
        this.addToHistory(this.sqlQuery);
      },
      error: (err) => {
        this.results = [];
        this.error = err.error?.error || 'Query failed';
        this.loading = false;
      }
    });
  }

  addToHistory(query: string) {
    if (!this.history.includes(query)) this.history.unshift(query);
    if (this.history.length > 10) this.history.pop();
  }

  formatQuery() {
    import('sql-formatter').then(({ format }) => {
      this.sqlQuery = format(this.sqlQuery, { language: 'sqlite' });
    });
  }

  addTab() {
    this.tabs.push({ label: `Tab ${this.tabs.length + 1}`, query: '' });
    this.currentTabIndex = this.tabs.length - 1;
  }

  closeTab(index: number) {
    this.tabs.splice(index, 1);
    if (this.currentTabIndex >= this.tabs.length) this.currentTabIndex = this.tabs.length - 1;
  }

  saveQuery() {
    const name = this.newQueryName.trim();
    if (!name) return;

    const exists = this.savedQueries.some(q => q.name === name);
    if (!exists) {
      this.savedQueries.push({ name, sql: this.sqlQuery });
      this.newQueryName = ''; // clear field
    }
  }

  toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
  }
}
