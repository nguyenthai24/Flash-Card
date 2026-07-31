import chrome from '~/assets/images/chrome.png';
import edge from '~/assets/images/edge.png';
import firefox from '~/assets/images/firefox.png';
import opera from '~/assets/images/opera.png';
import safari from '~/assets/images/safari.png';

export const getBrowserImage = (browser?: string) => {
  switch (true) {
    case browser?.toLocaleLowerCase()?.includes('chrome'):
      return chrome;

    case browser?.toLocaleLowerCase()?.includes('edge'):
      return edge;

    case browser?.toLocaleLowerCase()?.includes('safari'):
      return safari;

    case browser?.toLocaleLowerCase()?.includes('opera'):
      return opera;

    case browser?.toLocaleLowerCase()?.includes('firefox'):
      return firefox;

    default:
      return null;
  }
};
