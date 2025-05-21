# SQL Editor App

A full-stack web application that allows users to write, execute, and manage SQL queries against a local SQLite database. Built with **Angular 17**, **Node.js**, and **SQLite**, styled using **Angular Material**, and includes features like query history, saved queries, dark mode, and schema explorer.

---

## Features

- Execute SQL queries against a live SQLite database
- View database schema in a left sidebar
- Preset queries for quick access
- Save queries with custom names
- Query history for recent runs
- Responsive 3-panel layout
- Dark mode toggle 🌙
- Angular Material UI
- Tabs for multiple query contexts
- Export results (CSV, JSON) *(optional)*

---

##  Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | Angular 17 (standalone APIs), Angular Material |
| Backend   | Node.js (Express), SQLite (via `sqlite3` and `sqlite`) |
| UI Design | Angular Material (prebuilt theme + dark mode) |
| Styling   | Custom CSS + Material Typography |

---

##  Folder Structure

```
sql-editor/
├── client/              # Angular app
│   ├── app/
│   │   ├── components/
│   │   │   ├── tabs/        # Tab component
│   │   │   ├── schema/      # Schema explorer
│   │   │   ├── history/     # History sidebar
│   │   │   ├── saved/       # Saved queries
│   │   │   └── query-result/ # Results table
├── server/              # Node.js API
│   ├── index.ts         # Express + SQLite routes
│   └── database.sqlite  # SQLite DB file
```

---

##  Setup Instructions

###  Server

```bash
cd server
npm install
npm run start
```

Runs on: `http://localhost:3001`

---

###  Client (Angular App)

```bash
cd client
npm install
ng serve
```

Runs on: `http://localhost:4200`

>  Make sure CORS is allowed in the backend and both apps are running for full functionality.

---

##  Screenshots

- [Main UI with query editor](https://github.com/neelam1995/sql-editor/blob/main/screenshots/image1.png)
- [Dark mode toggle](https://github.com/neelam1995/sql-editor/blob/main/screenshots/image2.png)
- [Query results + right sidebar with saved/history](https://github.com/neelam1995/sql-editor/blob/main/screenshots/image3.png)

---

##  Roadmap (Optional Features)

- [ ] Export to CSV/JSON
- [ ] Table creation UI
- [ ] Syntax highlighting with Monaco Editor
- [ ] Authentication for user-scoped queries
- [ ] Multi-tab persistence via localStorage

---

##  Author

Developed by **Neelam Kumari**  
Feel free to fork, customize, and enhance.
