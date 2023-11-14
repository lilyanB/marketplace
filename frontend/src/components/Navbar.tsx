"use client"

import React, { useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Link,
} from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo";
import SwitchMode from "./SwitchMode";

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const menuItems = ["Home", "Market", "Create"];
    const menuLinks = ["/", "/market", "/create"];

    const renderNavbarItems = () => {
        return menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
                <Link className="w-full" color="foreground" href={menuLinks[index]} size="lg">
                    {item}
                </Link>
            </NavbarMenuItem>
        ));
    };

    return (
        <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent>
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem key={`${item}-${index}`} isActive={menuLinks[index] === window.location.pathname}>
                        <Link color="foreground" href={menuLinks[index]}>
                            {item}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex"></NavbarItem>
                <NavbarItem>
                    <SwitchMode />
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>{renderNavbarItems()}</NavbarMenu>
        </Navbar>
    );
}
