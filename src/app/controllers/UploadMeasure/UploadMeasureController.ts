import { z } from 'zod';
import { IRequest, IResponse } from '../../interface/IController';
import { UploadMeasureUseCase } from '../../useCases/UploadMeasure/UploadMeasureUseCase';

const uploadSchema = z.object({
  image: z.string(),
  customer_code: z.string().uuid(),
  measure_datetime: z.string().transform((str) => new Date(str)),
  measure_type: z.enum(['WATER', 'GAS'])
});

export class UploadMeasureController {
  constructor(private readonly uploadMeasure: UploadMeasureUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const validatedData = uploadSchema.parse(body);

      // const result = await this.uploadMeasure.execute();
      console.log(validatedData);
      return {
        statusCode: 200,
        body,
      };

    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: {
            error: 'Invalid data',
            details: error.errors
          }
        };
      }

      return {
        statusCode: 500,
        body: {
          error: 'Internal server error'
        }
      };
    }
  }
}
