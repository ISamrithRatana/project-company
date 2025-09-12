export interface UserDto {
  id: number;
  name: string;
  email: string;
  cloudId?: number | null;
  cloud?: {
    id: number;
    userId: number;
  } | null;
}



export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  cloudId?: number; // ✅ add this
}
