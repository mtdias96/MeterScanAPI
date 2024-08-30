import bodyParser from 'body-parser';
import express from 'express';
import { routeAdapter } from './app/adapters/routerAdapter';
import { UploadMeasureController } from './app/controllers/UploadMeasure/UploadMeasureController';


const app = express();
const PORT = 3000;
app.use(bodyParser.json({ limit: '10mb' }));

app.use(express.json());

app.post('/upload', routeAdapter(new UploadMeasureController));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
