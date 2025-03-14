"use client";
import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="px-4 sm:px-6">
      <NavbarContent justify="start">
        <NavbarBrand>
          <Icon icon="lucide:bar-chart" className="w-6 h-6 text-primary" />
          <p className="font-bold text-inherit ml-2">PC IPNU-IPPNU Ponorogo</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="primary" variant="solid">
            Admin Login
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
