export type AppErrorType = {
  name: string;
  message: string;
  status: number;
  stack: string;
};

class AppError extends Error {
  status: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "App Error";
    this.status = statusCode;
  }
}

export default AppError;
