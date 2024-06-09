class BadRequestError extends Error {
  private statusCode: number;

  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = message;
  }
}

export default BadRequestError;
