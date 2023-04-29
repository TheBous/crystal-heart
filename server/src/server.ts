import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { EcgRoute } from './routes/ecg.route';
import { ValidateEnv } from '@utils/validateEnv';

ValidateEnv();

try {
  const app = new App([new UserRoute(), new AuthRoute(), new EcgRoute()]);
  app.listen();
} catch (e) {
  console.error(`Error here ${e}`);
}
