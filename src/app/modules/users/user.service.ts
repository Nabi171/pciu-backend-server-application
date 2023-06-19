import { UserModel } from './user.model';
import { IUser } from './user.interface';
import { SortOrder } from 'mongoose';
// import { paginationHelpers } from '../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import { userSearchableFields } from './user.constant';
import { paginationHelpers } from '../helpers/paginationHelpers';

const createUser = async (
  payload: IUser
): Promise<IUser> => {
    const result = await UserModel.create(payload);

  if (!createUser) {
    throw new Error('fail to create user');
  }
  return result;
};

const getAllUsers = async (
  filters: any,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagianation(paginationOptions);

  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $paginationOptions: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await UserModel.find(whereConditions)
    
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  

  return {
    meta: {
      page,
      limit,
    
    },
    data: result,
  };
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await UserModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  )
  return result;
};

const getSingleUser = async (
  id: string
): Promise<IUser | null> => {
  const result = await UserModel.findById(id)
  return result;
};

const deleteUser = async (
  id: string
): Promise<IUser | null> => {
  const result = await UserModel.findByIdAndDelete(id);
  return result;
};

export const userService = {
  createUser,
  getAllUsers,
  updateUser,
  getSingleUser,
  deleteUser
  };