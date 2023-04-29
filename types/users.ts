export interface IUserDataIncome {
  name: string,
  email: string,
  password: string,
  role?: string,
}

export interface IUser extends IUserDataIncome {
	role: string;
}

export interface IUserOptional {
  name?: string,
  email?: string,
  password?: string,
  role?: string,
}