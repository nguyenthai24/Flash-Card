import { Box } from "@mantine/core";
import { headers } from "next/headers";
import { PropsWithChildren, Suspense } from "react";
import Footer from "../Footer";
import Header from "~/components/Layouts/Header";
import { theme } from "~/constants";
import AuthMobile from "../Auth/authMobile";

export interface IMainLayoutProps extends PropsWithChildren {}

export default async function MainLayout({
  children,
}: Readonly<IMainLayoutProps>) {
  const headerList = headers();
  const isSDK = headerList.get("x-is-sdk") === "true";

  return (
    <Suspense>
      {/* Chỉ hiển thị Header nếu không phải SDK */}
      {!isSDK && <Header />}

      <Box
        style={{
          marginTop: !isSDK ? theme.sizes.HEADER_HEIGHT : 0,
          flex: 1,
          // backgroundColor: theme.colors.BACKGROUND,
          position: "relative",
        }}
      >
        {children}
      </Box>

      {!isSDK && <Footer />}
    </Suspense>
  );
}
