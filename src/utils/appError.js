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
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
    this.message = 'Not found.'
  }
}
module.exports = { AppError, NotAuthorizedError, ConflictError, NotFoundError };
