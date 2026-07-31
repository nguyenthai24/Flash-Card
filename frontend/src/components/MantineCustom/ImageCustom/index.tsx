import { Image as MantineImage, ImageProps as MantineImageProps } from '@mantine/core';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import empty_image from '~/assets/images/empty_image.png';

// export type IImageProps = MantineImageProps & NextImageProps;
export type IImageCustomProps = MantineImageProps & {
  alt?: string;
  width?: NextImageProps['width'];
  height?: NextImageProps['height'];
  priority?: boolean;
};

export default function  ImageCustom(props: IImageCustomProps) {
  return (
    <MantineImage
      alt=""
      component={NextImage}
      fallbackSrc={empty_image.src}
      fit="cover"
      {...props}
    />
  );
}
