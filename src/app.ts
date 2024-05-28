import express, { Application, NextFunction, Request, Response, request } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/student/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandller';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//api/v1/students/create-student

//application routes
app.use('/api/v1', router);


const test = (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
};

app.get('/', test);

app.use(globalErrorHandler);

//not found route
app.use(notFound);
export default app;
