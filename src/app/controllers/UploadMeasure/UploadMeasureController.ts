import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { GoogleGenerativeAIService } from '../../../server/api/GoogleGenerativeAIService';
import { IRequest, IResponse } from '../../interface/IController';


const isValidBase64Image = (str: string): boolean => {
  // Prefixo esperado
  const prefix = 'data:image/png;base64,';
  return str.startsWith(prefix) && str.length > prefix.length;
};

const uploadSchema = z.object({
  image: z.string().refine(val => isValidBase64Image(val), {
    message: 'Invalid base64 image format or incorrect prefix',
  }),
  customer_code: z.string(),
  measure_datetime: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: 'Invalid date format',
  }),
  measure_type: z.enum(['WATER', 'GAS']),
});

export class UploadMeasureController {
  private genAIService: GoogleGenerativeAIService;

  constructor() {
    this.genAIService = new GoogleGenerativeAIService();
  }

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { image, customer_code, measure_datetime, measure_type } = uploadSchema.parse(body);
      const measureUuid = uuidv4();

      const imageData = image.split(',')[1];
      if (!imageData) {
        throw new Error('Base64 image data is missing');
      }

      const filePart = {
        inlineData: {
          data: image.split(',')[1],
          mimeType: 'image/jpeg',
        },
      };

      const generatedText = await this.genAIService.generateContent(
        filePart,
        'valor correspondente ao consumo do relogio de 8 dgitos'
      );

      const parteInteressada = generatedText.split('**')[1];
      const valorConsumo = parteInteressada.split(' m³')[0];

      return {
        statusCode: 200,
        body: {
          image_url: image,
          measure_value: valorConsumo,
          measure_uuid: measureUuid
        },
      };

    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          statusCode: 400,
          body: {
            error_code: 'INVALID_DATA',
            error_description: error.errors,
          },
        };
      }

      return {
        statusCode: 500,
        body: {
          error: 'Internal server error',
        },
      };
    }
  }
}
