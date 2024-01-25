"use client";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const Header = () => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <Link href={"/"} legacyBehavior passHref>
            <NavigationMenuItem className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuItem>
          </Link>
          <NavigationMenuItem>
            <Link href={"/sign-in"} legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Sign up
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

export default Header;
