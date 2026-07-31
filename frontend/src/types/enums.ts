// export enum EOS {
//   IOS = 'iOS',
//   WINDOW = 'Windows',
// }

// Các api code của server vihub, vipay
export enum EAPI_STATUS_CODE {
  SUCCESS = 0,
  ACCOUNT_LOCKED = 2, //Tài khoản bị khóa do đăng nhập sai nhiều lần
  ACCOUNT_BANNED = 3, //Tài khoản bị khóa
  ACCOUNT_NOT_VERIFY = 4, //Tài khoản chưa xác minh
  INVALID_USER = 6, //Người dùng không hợp lệ
  OTP_REQUIRED = 20, //Yêu cầu nhập otp
  PASSWORD_REQUIRED = 23, //Yêu cầu nhập mật khẩu khi đăng nhập
  UNAUTHORIZATION = 401, //
  CONFLICT = 409, //
}

// Các api code của server vinews, vicrm
export enum EAPI_STATUS_CODE_V2 {
  FAIL,
  SUCCESS,
  BAD_REQUEST,
  DATA_NOT_FOUND,
}

export enum EGENDER {
  MALE = 'MALE',
  FAMALE = 'FEMALE',
}

export enum EUSER_SUB_VALID_STATUS {
  QUICK_PLAY = 'QUICK_PLAY', // Đăng nhập qua chơi nhanh
  SIGN_UP = 'SIGN_UP', // Đăng ký tài khoản chưa xác thực
  UPDATED = 'UPDATED', // Đã cập nhật thông tin cá nhân
  OTP_VERIFIED = 'OTP_VERIFIED', // Xác thực khi người dùng thực hiện đăng ký tài khoản
  FB_VERIFIED = 'FB_VERIFIED', // Xác thực khi đăng nhập bằng facebook
  GG_VERIFIED = 'GG_VERIFIED', // Xác thực khi đăng nhập qua google
  APPLE_VERIFIED = 'APPLE_VERIFIED', // Xác thực khi đăng nhập qua Apple
  PHONE_VERIFIED = 'PHONE_VERIFIED', // Xác thực số điện thoại
  BILL_VERIFIED = 'BILL_VERIFIED', // Cập nhật thông tin hóa đơn
}

export enum ESOCIAL_TYPE {
  FACEBOOK = 'FACEBOOK',
  GOOGLE = 'GOOGLE',
  APPLE = 'APPLE',
}

export enum EDEVICE_TYPE {
  DESKTOP = 'DESKTOP',
  ANDROID = 'ANDROID',
  IOS = 'IOS',
}
