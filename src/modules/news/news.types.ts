export interface News {
  id: number;
  name: string;
  price: string;
  unit: string;
  origin: string;
  path: string;
}

export interface CreateNewsDto {
  name: string;
  price: string;
  unit: string;
  origin: string;
  path: string;
}

export interface UpdateNewsDto {
  id: number;
  name?: string;
  price?: string;
  unit?: string;
  origin?: string;
  path?: string;
}
