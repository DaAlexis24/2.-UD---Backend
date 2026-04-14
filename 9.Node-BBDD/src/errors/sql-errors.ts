type SqlErrorOptions = {
  code?: string;
  errno?: number;
  sqlMessage?: string;
  sqlState?: string;
} & ErrorOptions;

export class SQLError extends Error {
  code?: string;
  sqlMessage?: string;
  sqlState?: string;
  errno: number;
  constructor(
    message?: string | undefined,
    options?: SqlErrorOptions | undefined,
  ) {
    super(message, options);
    this.code = options?.code;
    this.statusMessage = statusMessage || '';
    console.log();
  }
}
