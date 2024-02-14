import { type NextFunction, type Request } from 'express';
import { type users } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import { JwtPayload, type CustomResponse } from '@/types/common.type';
import Api from '@/lib/api';
import SessionsService from './sessions.service';

export default class SessionsController extends Api {
  private readonly sessionsService = new SessionsService();

  public getSessions = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    try {
      const result = await this.sessionsService.getSessions(
        req.query?.code as string,
        req.user as JwtPayload
      );
      this.send(res, result, HttpStatusCode.Created, 'getSessions');
    } catch (e) {
      next(e);
    }
  };

  public createSession = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    try {
      const result = await this.sessionsService.createSession(
        req.body,
        req.user as JwtPayload
      );
      this.send(res, result, HttpStatusCode.Created, 'createSession');
    } catch (e) {
      next(e);
    }
  };

  public paySession = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    try {
      const result = await this.sessionsService.paySession(req.body);
      this.send(res, result, HttpStatusCode.Created, 'paySession');
    } catch (e) {
      next(e);
    }
  };

  public paymentCallback = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    try {
      console.log(req.body);
      const result = await this.sessionsService.paymentCallback(req.body);
      this.send(res, result, HttpStatusCode.Created, 'paymentCallback');
    } catch (e) {
      next(e);
    }
  };

  public deleteSession = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    try {
      const result = await this.sessionsService.deleteSession(req.body);
      this.send(res, result, HttpStatusCode.Ok, 'deleteSession');
    } catch (e) {
      next(e);
    }
  };
}
