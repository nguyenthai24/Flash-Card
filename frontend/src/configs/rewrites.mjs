/** https://nextjs.org/docs/app/api-reference/next-config-js/rewrites */
const rewrites = async () => {
  return {
    afterFiles: [
      // ########## AUTH #########
      { source: '/dang-nhap', destination: '/login' },
      { source: '/dang-ky', destination: '/register' },
      { source: '/xac-minh-dang-ky-tai-khoan', destination: '/verify-email' },
      { source: '/quen-mat-khau', destination: '/forgot-password' },
      { source: '/doi-mat-khau-moi', destination: '/reset-password' },
    ],
  };
};

export default rewrites;
