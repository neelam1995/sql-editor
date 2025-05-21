import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// SQLite init
let db: Database<sqlite3.Database, sqlite3.Statement>;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  });
  await db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT);');
})();

async function refreshSchema(): Promise<{ [key: string]: string[] }> {
  const tables = await db.all(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
  );

  const schema: { [key: string]: string[] } = {};

  for (const table of tables) {
    const columns = await db.all(`PRAGMA table_info(${table.name});`);
    schema[table.name] = columns.map((c: any) => c.name);
  }

  return schema;
}

// API Routes
app.post('/api/query', async (req, res) => {
  const { sql } = req.body;
  try {
    const rows = await db.all(sql);

    // Check if schema might have changed
    const lowered = sql.trim().toLowerCase();
    const schemaChanged = lowered.startsWith('create table') || lowered.startsWith('drop table');

    const schema = schemaChanged ? await refreshSchema() : null;

    res.json({ success: true, rows, schema });
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

const frontendPath = path.join(__dirname, '../../client/dist/sql-editor/browser'); // name must match
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
