
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../Shared/catchAsync';
// import sendResponse from '../../../Shared/sendResponse';
import { IUser } from './user.interface';
import { userService } from './user.service';
import pick from '../../../Shared/pick';
import { userFilterableFields } from './user.constant';
import { paginationFields } from '../../../constants/pagination';
import sendResponse from '../../../Shared/sendresponse';


const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await userService.createUser(
    userData
  );

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'buyer user created successfully!',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query,userFilterableFields);
  const paginationOptions = pick(req.query,paginationFields);

  const result = await userService.getAllUsers(
    filters,
    paginationOptions
  );
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department fetched successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.updateUser(id, req.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await userService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const userController = {
getAllUsers,
createUser,
updateUser,
getSingleUser,
deleteUser
};
