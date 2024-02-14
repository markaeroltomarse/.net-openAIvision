import { Router } from 'express';
import Controller from './users.controller';
import {
  CreateUserDto,
  DeleteUserDto,
  ICreateMemberDto,
  LoginFounderDto,
  UpdateUserDto,
} from '@/dto/user.dto';
import RequestValidator from '@/middlewares/request-validator';
import { verifyAuthToken } from '@/middlewares/auth';

const users: Router = Router();
const controller = new Controller();

/**
 * Create user body
 * @typedef {object} CreateUserBody
 * @property {string} email.required - email of user
 * @property {string} name.required - name of user
 * @property {string} cognitoId.required - cognito id
 * @property {string} phone - phone number
 */
/**
 * User
 * @typedef {object} User
 * @property {string} email - email of user
 * @property {string} name - name of user
 * @property {string} cognitoId - cognito id
 * @property {string} phone - phone number
 */
/**
 * POST /users
 * @summary Create user
 * @tags users
 * @param {CreateUserDto} request.body.required
 * @return {User} 201 - user created
 * @return {object} 400 - Bad request response
 */
users
  .route('')
  .post(RequestValidator.validate(CreateUserDto), controller.createUser)

  /**
   * GET /users
   * @summary Get User info
   * @security BasicAuth
   * @tags users
   * @return {User} 200 - user info
   * @example response - 200 - success response example
   * @return {object} 400 - Bad request response
   * @return {object} 401 - Unauthorized request response
   */
  .get(verifyAuthToken, controller.getFounderInfo);

/**
 * Update user body
 * @typedef {object} UpdateUserDto
 * @property {string} name - name of user
 * @property {string} phone - phone number
 */
/**
 * User
 * @typedef {object} User
 * @property {string} name - name of user
 * @property {string} phone - phone number
 */
/**
 * PATCH /users
 * @summary Create user
 * @tags users
 * @param {UpdateUserDto} request.body.required
 * @return {User} 201 - user created
 */
users.patch(
  '/',
  verifyAuthToken,
  RequestValidator.validate(UpdateUserDto),
  controller.updateUser
);

users.post(
  '/login',
  RequestValidator.validate(LoginFounderDto),
  controller.login
);

users
  .route('/member')
  .post(RequestValidator.validate(ICreateMemberDto), controller.createMember)
  .get(controller.getMemberInfo);

users.delete(
  '/',
  verifyAuthToken,
  RequestValidator.validate(DeleteUserDto),
  controller.deleteUser
);

export default users;
