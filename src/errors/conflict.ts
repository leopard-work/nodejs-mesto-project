class ConflictError extends Error {
  private statusCode: number;

  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = message;
  }
}

export default ConflictError;
