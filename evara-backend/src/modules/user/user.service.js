import { User } from './user.model.js';

export const createUser = (payload) => User.create(payload);

export const getUserById = (id) => User.findById(id);
