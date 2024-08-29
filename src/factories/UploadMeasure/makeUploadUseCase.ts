import { UploadMeasureUseCase } from '../../app/useCases/UploadMeasure/UploadMeasureUseCase';

export function makeUploadUseCase(){
  return new UploadMeasureUseCase();
}
