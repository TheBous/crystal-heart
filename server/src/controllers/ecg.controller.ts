import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { EcgService } from '@/services/ecg.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class EcgController {
  public ecg = Container.get(EcgService);

  public saveEcg = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const { prompt } = req.body;
      const ecgSave: any = await this.ecg.saveEcg();
      console.warn(ecgSave);
      res.status(200).json({ data: ecgSave, message: 'Ecg saved' });
    } catch (error) {
      next(error);
    }
  };

  public saveFakeEcg = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      console.warn(req.user);
      const userId: string = req.user._id;
      const ecgSave: any = await this.ecg.saveTestFakeEcg(userId);
      console.warn(ecgSave);
      res.status(200).json({ data: ecgSave, message: 'Ecg saved' });
    } catch (error) {
      next(error);
    }
  };

  public getEcg = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, page, limit } = req.query;
      const data: any = await this.ecg.getEcg(id as string, { page: page as string, limit: limit as string });
      console.warn(data);
      res.status(200).json({ data, message: 'Ecg saved' });
    } catch (error) {
      next(error);
    }
  };
}
