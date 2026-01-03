"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { isNullOrUndefined } from "node:util";
import { AnimateIcon } from "./animate-ui/icons/icon";
import { SunMoon } from "./animate-ui/icons/sun-moon";
import { Sun } from "./animate-ui/icons/sun";
import { Moon } from "./animate-ui/icons/moon";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <AnimateIcon animateOnHover>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
          {theme === "dark" ? (
            <Moon className="" />
          ) : theme === "light" ? (
            <Sun className="" />
          ) : theme === "system" ? (
            <SunMoon />
          ) : null}
          <span className="sr-only">Toggle theme</span>
        </DropdownMenuTrigger>
      </AnimateIcon>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
