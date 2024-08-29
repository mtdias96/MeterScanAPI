import { UploadMeasureController } from '../../app/controllers/UploadMeasure/UploadMeasureController';
import { makeUploadUseCase } from './makeUploadUseCase';

export function makeUploadController(){
  const uploadUseCase = makeUploadUseCase();
  return new UploadMeasureController(uploadUseCase);
}
