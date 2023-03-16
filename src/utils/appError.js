class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}
module.exports = { AppError, NotAuthorizedError, ConflictError };
