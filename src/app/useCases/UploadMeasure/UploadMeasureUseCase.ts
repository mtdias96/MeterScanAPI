
export interface IUploadMeasureRequest {
  imageUrl: string;
  customer_code: string;
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
}

export class UploadMeasureUseCase{
  async execute(){


  }
}
