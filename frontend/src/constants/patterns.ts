export const VIET_HOA =
  'ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂưăạảấầẩẫậắằẳẵặẹẻẽềếểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ';

//format date DD/MM/YYYY
export const DATE = /^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/;

//mật khẩu ít nhất 8 ký tự, tối đa 50 kí tự chứa ít nhất 1 kí tự viết hoa, 1 kí tự thường, 1 kí tự đặc biệt, 1 số
export const PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,50}$/;

export const EMAIL =
  /^(?:[a-zA-Z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;

//website http://abc.vn hoặc https://abc.com
export const WEBSITE =
  /^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=]*)?$/;

//phone number 0912345678 hoặc 0123456789
export const PHONE_NUMBER = /^0[1-9]{1}[0-9]{8}$/;

//căn cước chỉ bao gồm số, dài 9 hoặc 12
export const IDENTITY = /^[0-9]{9}$|^[0-9]{12}$/;

//Check 1 số kí tự đặc biệt của HTML
// export const ESCAPE_HTML_TAG = /[/\\><]/;
// export const ESCAPE_HTML_TAG = /[^<>/\\]$/g;
export const ESCAPE_HTML_TAG = /^[^<>]*$/g;

//Không chưa kí tự đặc biệt và cả khoảng trắng
export const ESCAPE_SPECIAL_CHARATER = /^[a-zA-Z0-9-_]*$/g;

//Không chưa kí tự đặc biệt (đc phép có khoảng trắng)
export const ESCAPE_SPECIAL_CHARATERV2 = /^[a-zA-Z0-9-_\s]*$/g;

//Kiểm tra base64 hợp lệ
export const BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
