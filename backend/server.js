const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todolist',
});

db.connect(err => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener tareas:', err);
      res.status(500).json({ error: 'Error al obtener tareas' });
    } else {
      res.json(results);
    }
  });
});

app.post('/tasks', (req, res) => {
  const { name, completed } = req.body;
  const sql = 'INSERT INTO tasks (name, completed) VALUES (?, ?)';
  db.query(sql, [name, completed], (err, results) => {
    if (err) {
      console.error('Error al insertar tarea:', err);
      res.status(500).json({ error: 'Error al añadir tarea' });
    } else {
      res.json({ id: results.insertId, name, completed });
    }
  });
});


app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  if (isNaN(taskId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const sql = 'DELETE FROM tasks WHERE id = ?';

  db.query(sql, [taskId], (err, results) => {
    if (err) {
      console.error('Error al eliminar tarea:', err);
      return res.status(500).json({ error: 'Error en el servidor al eliminar la tarea' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ message: 'Tarea eliminada correctamente', id: taskId });
  });
});

app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (completed !== 0 && completed !== 1) {
    return res.status(400).send('El campo "completed" debe ser 0 o 1');
  }

  const sql = 'UPDATE tasks SET completed = ? WHERE id = ?';
  db.query(sql, [completed, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar tarea:', err);
      res.status(500).send('Error al actualizar la tarea');
      return;
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Tarea no encontrada');
    }

    res.send({ message: 'Tarea actualizada correctamente' });
  });
});



