"use client";

import { Box, NavLink } from "@mantine/core";
import { ReactNode } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { theme } from "~/constants";
import { SidebarWrapper } from "./styled";
// import { BorderBoxWrapper } from '~/components/GlobalStyled/BorderBoxWrapper';

export interface ISidebarMenuITem {
  title: string;
  path?: string; //Nếu là menu cha không cần path
  children?: ISidebarMenuITem[];
  icon?: ReactNode;
}

export interface ISidebarProps {
  data: ISidebarMenuITem[];
  header?: ReactNode;
}

export default function Sidebar({ header, data }: ISidebarProps) {
  const pathname = usePathname();

  const renderNavLink = (data: ISidebarMenuITem[]) => {
    return data?.map((e, index, arr) => {
      const { path, title, children, icon } = e;

      //Check mặc định sẽ active index đầu tiền nếu không có menu nào đc active
      // const __ = arr.some((e) => e.path && pathname.includes(e.path));
      // const active = !__ ? index === 0 : !!path && pathname.includes(path);
      const active = !!path && pathname.includes(path);

      return (
        <NavLink
          style={{ pointerEvents: active ? "none" : "initial" }} //Disable click menu active
          component={Link}
          href={(path || "#") as any} //Nếu là menu cha không cần path
          label={title}
          key={index}
          active={active}
          leftSection={icon}
        >
          {Array.isArray(children) && renderNavLink(children)}
        </NavLink>
      );
    });
  };

  return (
    <SidebarWrapper>
      {header}

      <Box
        pt={16}
        style={{ position: "sticky", top: theme.sizes.HEADER_HEIGHT, left: 0 }}
      >
        {renderNavLink(data)}
      </Box>
    </SidebarWrapper>
  );
}
