/** https://nextjs.org/docs/app/api-reference/next-config-js/rewrites */
const rewrites = async () => {
  return {
    afterFiles: [
      // ########## AUTH #########

      // Đăng nhập
      // { source: '/dang-nhap', destination: '/login' },

      // //Đăng ký
      // { source: '/dang-ky', destination: '/register' },

      // //Xác minh đăng ký tài khoản
      // { source: '/xac-minh-dang-ky-tai-khoan', destination: '/verify-register' },

      // //Mở khóa tài khoản
      // { source: '/mo-khoa-tai-khoan', destination: '/unlock-account' },

      // //Xác minh mở khóa tài khoản
      // { source: '/xac-minh-mo-khoa-tai-khoan', destination: '/verify-unlock-account' },

      // //Quên mật khẩu
      // { source: '/quen-mat-khau', destination: '/forgot-password' },

      // //Đổi mật khẩu
      // { source: '/doi-mat-khau-moi', destination: '/change-new-password' },

      // ########## MAIN #########
      // Trang chủ
      { source: '/', destination: '/home' },

      // Danh sách game
      { source: '/danh-sach-game', destination: '/game/list' },

      // Chi tiết game
      { source: '/thong-tin-game/:slug', destination: '/game/detail/:slug' },

      // game mini
      { source: '/choi-game/:slug', destination: '/game/play/:slug' },

      // Tin tức
      { source: '/tin-tuc', destination: '/post/news' },

      // Chi tiết Tin tức
      { source: '/tin-tuc/:slug', destination: '/post-detail/:slug' },

      // Sự kiện
      { source: '/su-kien', destination: '/post/event' },

      // Chi tiết Sự kiện
      { source: '/su-kien/:slug', destination: '/post-detail/:slug' },

      // Tin tức
      { source: '/khuyen-mai', destination: '/post/promotion' },

      // Chi tiết Tin tức
      { source: '/khuyen-mai/:slug', destination: '/post-detail/:slug' },

      //Gửi yêu cầu hỗ trợ
      { source: '/gui-yeu-cau-ho-tro', destination: '/ticket' },

      //Lịch sử yêu cầu hỗ trợ
      { source: '/lich-su-yeu-cau-ho-tro', destination: '/ticket-history' },

      //Hỗ trợ
      { source: '/ho-tro', destination: '/support' },

      // Chi tiết Hỗ trợ
      { source: '/ho-tro/:slug', destination: '/support/:slug' },

      // Chi tiết câu hỏi
      { source: '/ho-tro/:slug/:slug2', destination: '/support/:slug/:slug2' },

      // Chính sách
      { source: '/chinh-sach/:name', destination: '/policy/:name' },

      //Nạp vixu
      { source: '/nap-vixu', destination: '/deposit/vixu' },

      //Nạp game
      // { source: '/nap-game', destination: '/deposit/game' },
      { source: '/nap-game/:slug*', destination: '/deposit-game/:slug*' },

      // ########## ACCOUNT #########
      // Thông tin tài khoản
      { source: '/thong-tin-ca-nhan', destination: '/account-info' },

      // Xác thực tài khoản và kết nối
      { source: '/xac-thuc-tai-khoan', destination: '/account-authenticate' },

      // Bảo mật tài khoản
      { source: '/bao-mat-tai-khoan', destination: '/account-security' },

      // Danh sách game đã chơi, chưa chơi
      { source: '/danh-sach-game-da-choi-chua-choi', destination: '/account-game-played' },

      // Lịch sử đăng nhập, đăng xuất
      { source: '/lich-su-dang-nhap', destination: '/account-log-history' },

      // Lịch sử giao dịch
      { source: '/lich-su-giao-dich-vixu', destination: '/account-transaction-history' },

      // Lịch sử tích điểm
      { source: '/lich-su-tich-diem', destination: '/account-point-history' },

      // Lịch sử tích điểm
      { source: '/ho-tro-truc-tuyen', destination: '/account-support' },
    ],
  };
};

export default rewrites;
