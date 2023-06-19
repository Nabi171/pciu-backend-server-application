export type IGenericResponse<T> = {
    meta: {
      page?: number;
      limit: number;
    
    };
    data: T;
  };