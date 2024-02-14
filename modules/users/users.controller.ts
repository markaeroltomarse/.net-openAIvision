import { type NextFunction, type Request } from 'express';
import { type users } from '@prisma/client';
import { HttpStatusCode } from 'axios';
import UserService from './users.service';
import { type CustomResponse } from '@/types/common.type';
import Api from '@/lib/api';

export default class UserController extends Api {
  private readonly userService = new UserService();

  public createUser = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.createUser(req.body);
      this.send(res, user, HttpStatusCode.Created, 'createUser');
    } catch (e) {
      next(e);
    }
  };

  public login = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.login(req.body);
      this.send(res, user, HttpStatusCode.Created, 'login');
    } catch (e) {
      next(e);
    }
  };

  public updateUser = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.updateUser(req.body);
      this.send(res, user, HttpStatusCode.Created, 'updateUser');
    } catch (e) {
      next(e);
    }
  };

  public createMember = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.createMember(req.body);
      this.send(res, user, HttpStatusCode.Created, 'createMember');
    } catch (e) {
      next(e);
    }
  };

  public getMemberInfo = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getMemberInfo(
        req.query?.email as string
      );
      this.send(res, user, HttpStatusCode.Created, 'getMemberInfo');
    } catch (e) {
      next(e);
    }
  };

  public getFounderInfo = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getFounderInfo(
        req.user?.id as string
      );
      this.send(res, user, HttpStatusCode.Created, 'getFounderInfo');
    } catch (e) {
      next(e);
    }
  };

  public deleteUser = async (
    req: Request,
    res: CustomResponse<users>,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.deleteUser(req.body);
      this.send(res, user, HttpStatusCode.Ok, 'deleteUser');
    } catch (e) {
      next(e);
    }
  };
}
