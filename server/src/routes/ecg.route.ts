import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import { EcgController } from '@/controllers/ecg.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class EcgRoute implements Routes {
  public path = '/ecg';
  public router = Router();
  public ecg = new EcgController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/measurements`, AuthMiddleware, this.ecg.getEcg);
    this.router.post(`${this.path}/upload`, AuthMiddleware, this.ecg.uploadEcg);
    this.router.get(`${this.path}/rr`, AuthMiddleware, this.ecg.getRR);
  }
}
