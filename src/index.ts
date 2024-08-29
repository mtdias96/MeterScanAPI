import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/upload', ((req, res) => {
  res.send('Rota ta on');
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
