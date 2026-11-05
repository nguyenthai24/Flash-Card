export enum ErrorCode {
  // ==========================================
  // COMMON: 100000 - 199999
  // ==========================================
  INTERNAL_SERVER_ERROR = 100000,
  VALIDATION_ERROR = 100001,
  BAD_REQUEST = 100002,
  UNAUTHORIZED = 100003,
  FORBIDDEN = 100004,
  NOT_FOUND = 100005,
  CONFLICT = 100006,

  // ==========================================
  // AUTH: 200000 - 299999
  // ==========================================
  INVALID_CREDENTIALS = 200000,
  EMAIL_ALREADY_EXISTS = 200001,
  ACCOUNT_DISABLED = 200002,
  INVALID_TOKEN = 200003,
  TOKEN_EXPIRED = 200004,
  REFRESH_TOKEN_REUSED = 200005,

  // ==========================================
  // USERS: 300000 - 399999
  // ==========================================
  USER_NOT_FOUND = 300000,
  USER_ALREADY_EXISTS = 300001,

  // ==========================================
  // FLASHCARDS: 400000 - 499999
  // ==========================================
  FLASHCARD_NOT_FOUND = 400000,
  FLASHCARD_ALREADY_EXISTS = 400001,

  // ==========================================
  // PAYMENT: 500000 - 599999
  // ==========================================
  PAYMENT_FAILED = 500000,
  PAYMENT_NOT_FOUND = 500001,
}
