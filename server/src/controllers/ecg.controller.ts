import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { EcgService } from '@/services/ecg.service';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class EcgController {
  public ecg = Container.get(EcgService);

  public saveEcg = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { date, frequency } = req.body;
      const userId: string = req.user._id;
      const ecgSave: any = await this.ecg.saveEcg(userId, date);
      console.warn(ecgSave);
      res.status(200).json({ data: ecgSave, message: 'Ecg saved' });
    } catch (error) {
      next(error);
    }
  };

  public uploadEcg = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      console.warn(req.user);
      const userId: string = req.user._id;
      const ecgSave: any = await this.ecg.uploadEcg(userId);
      res.status(200).json({ data: ecgSave, message: 'Ecg saved' });
    } catch (error) {
      next(error);
    }
  };

  public getEcg = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, page, limit } = req.query;
      const data = await this.ecg.getEcg(id as string, { page: page as string, limit: limit as string });
      res.status(200).json({ data, message: 'Ecg saved' });
    } catch (error) {
      next(error);
    }
  };

  public getUserEcgs = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = req.query;
      const userId: string = req.user._id;

      const data = await this.ecg.getUserEcgs(userId, { page: page as string, limit: limit as string });
      res.status(200).json({ data, message: 'Get User ECGs' });
    } catch (error) {
      next(error);
    }
  };

  public getStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, page, limit } = req.query;
      const data = await this.ecg.getStats(id as string, { page: page as string, limit: limit as string });
      res.status(200).json({ data, message: 'Get stats' });
    } catch (error) {
      next(error);
    }
  };

  public getInstantStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = req.query;
      const data = await this.ecg.getInstantStats({ page: page as string, limit: limit as string });
      res.status(200).json({ data, message: 'Get stats' });
    } catch (error) {
      next(error);
    }
  };
}
