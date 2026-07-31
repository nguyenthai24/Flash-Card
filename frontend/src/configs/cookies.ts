import Cookies from 'universal-cookie';

const cookiesClient = new Cookies(null, { path: '/' });

export default cookiesClient;
