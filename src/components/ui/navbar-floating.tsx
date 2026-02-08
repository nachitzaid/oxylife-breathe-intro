"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface NavbarFloatingProps {
    logo?: React.ReactNode;
    links?: { label: string; href: string; active?: boolean }[];
    actions?: React.ReactNode;
    className?: string;
}

export default function NavbarFloating({
    logo = <span className="font-semibold text-foreground">Logo</span>,
    links = [
        { label: "Home", href: "#", active: true },
        { label: "Features", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "About", href: "#" },
    ],
    actions,
    className,
}: NavbarFloatingProps) {
    return (
        <div className={cn("fixed top-4 left-0 right-0 z-50 w-full px-4 lg:px-6", className)}>
            <header className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-white/10 bg-background/60 px-4 md:px-6 shadow-2xl backdrop-blur-xl">
                <Link to="/" className="flex items-center">
                    {logo}
                </Link>
                <nav className="hidden items-center gap-2 md:flex">
                    {links.map((link) => (
                        <a
                            key={link.href + link.label}
                            href={link.href}
                            className={cn(
                                "rounded-full px-4 py-2 text-sm font-medium transition-all hover:bg-white/5",
                                link.active
                                    ? "bg-white/10 text-primary"
                                    : "text-muted-foreground hover:text-foreground",
                            )}
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    {actions}
                </div>
            </header>
        </div>
    );
}
