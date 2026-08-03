// import { GoogleAnalytics } from '@next/third-parties/google';
import dayjs from "dayjs";
import type { Metadata, Viewport } from "next";
import { Lexend } from "next/font/google";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { QueryProviders } from "~/configs/react-query";
import StyledComponentsRegistry from "~/configs/styled-component";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { MantineProvider } from "~/theme/provider";

const font = Lexend({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Quiz",
    default: "OpenQuiz", // a default is required when creating a template
  },
  description: "OpenQuiz",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

dayjs.locale("vi");
dayjs.extend(customParseFormat);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"
          strategy="afterInteractive"
        /> */}
      </head>
      <body suppressHydrationWarning={true} className={font.className}>
        <QueryProviders>
          <StyledComponentsRegistry>
            <MantineProvider>{children}</MantineProvider>
          </StyledComponentsRegistry>
        </QueryProviders>
      </body>

      {/* Thêm google analytics ở chế độ production */}
      {/* {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId="G-C02604TERV" />
      )} */}
    </html>
  );
}
