class NotFoundError extends Error {
  private statusCode: number;

  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = message;
  }
}

export default NotFoundError;
