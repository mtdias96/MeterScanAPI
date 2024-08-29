import { prismaClient } from '../../libs/prismaClient';

export interface IUploadMeasureRequest {
  image: string;
  customer_code: string; // UUID format
  measure_datetime: Date;
  measure_type: 'WATER' | 'GAS';
}

export class UploadMeasureUseCase{
  async execute({customer_code, image, measure_datetime, measure_type}:IUploadMeasureRequest){


    const newMeasure = await prismaClient.measure.create({
      data: {
        customer: {
          connect: { customer_code: 'customer-uuid' }
        },
        measure_datetime: new Date(),
        measure_type: 'water',
        image_base64: 'data:image/png;base64,...',
        guid: 'some-guid',
        image_link: 'https://temp-link.com/image.png',
        value: 42.7,
      },
    });
  }
}
