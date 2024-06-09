class ForbiddenError extends Error {
  private statusCode: number;

  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = message;
  }
}

export default ForbiddenError;
