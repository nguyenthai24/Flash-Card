import { Box, Button, Center, Stack } from "@mantine/core";
import Link from "next/link";
import image_404 from "~/assets/images/404.png";
import bg_404 from "~/assets/images/404_back_ground.jpg";
// import Header from '~/components/Layouts/Header';
import ImageCustom from "~/components/MantineCustom/ImageCustom";
import { PATHS, theme } from "~/constants";

export interface INotFoundProps {
  image?: any;
}

export default function NotFound({ image }: INotFoundProps) {
  return (
    <Stack mih="100vh" gap={0}>
      {/* <Header /> */}
      <Center pt={theme.sizes.HEADER_HEIGHT} flex={1} pos="relative">
        <Box
          style={{
            backgroundImage: `url(${bg_404.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
          }}
        />

        <Stack gap={32} align="center" style={{ zIndex: 1 }}>
          <ImageCustom src={image || image_404} />

          <Link href={PATHS.HOME}>
            <Button w={215} variant="outline">
              Quay lại trang chủ
            </Button>
          </Link>
        </Stack>
      </Center>
    </Stack>
  );
}
