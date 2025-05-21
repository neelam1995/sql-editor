import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let db: Database<sqlite3.Database, sqlite3.Statement>;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
  await db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT);');
})();


app.post('/api/query', async (req, res) => {
  const { sql } = req.body;
  try {
    const rows = await db.all(sql);
    res.json({ success: true, rows });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/schema', async (req, res) => {
  try {
    const tables = await db.all(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
    );

    const schema: { [key: string]: string[] } = {};

    for (const table of tables) {
      const columns = await db.all(`PRAGMA table_info(${table.name});`);
      schema[table.name] = columns.map((c: any) => c.name);
    }

    res.json({ success: true, schema });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
