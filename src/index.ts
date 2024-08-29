import express from 'express';
import { routeAdapter } from './app/adapters/routerAdapter';
import { makeUploadController } from './factories/UploadMeasure/makeUploadController';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/upload', routeAdapter(makeUploadController()));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
