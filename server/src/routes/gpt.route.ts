import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import { GptController } from '@/controllers/gpt.controller';

export class GptRoute implements Routes {
  public path = '/gpt';
  public router = Router();
  public gpt = new GptController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/prompt`, this.gpt.queryGPT);
  }
}
