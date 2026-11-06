import express from 'express';
import { projetos, skills } from './src/dados.js';

const app = express();

app.get('/api/projetos', (req, res) => res.json(projetos));
app.get('/api/skills', (req, res) => res.json(skills));

app.use(express.static('dist'));

app.listen(3000, () => console.log('Rodando em http://localhost:3000'));
