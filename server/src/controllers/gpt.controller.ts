import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { GptService } from '@/services/gpt.service';

export class GptController {
  public gpt = Container.get(GptService);

  public queryGPT = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { prompt } = req.body;
      const gptResponse: any = await this.gpt.queryGPT(prompt);
      console.warn(gptResponse);
      res.status(200).json({ data: gptResponse, message: 'gptPrompting' });
    } catch (error) {
      next(error);
    }
  };
}
