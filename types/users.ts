export interface IUserDataIncome {
  name: string,
  email: string,
  password: string,
  role?: string,
}

export interface IUser extends IUserDataIncome {
	role: string;
  favourites?: string[],
}

export interface IUserOptional {
  name?: string,
  email?: string,
  password?: string,
  role?: string,
}
