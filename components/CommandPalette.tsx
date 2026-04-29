"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Folder, User, Home, Globe, Mail, Menu, ArrowRight } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

const NAV_ITEMS = [
    { value: "home",     label: "Home",     href: "/",        icon: Home,   shortcut: "H" },
    { value: "projects", label: "Projects", href: "/projects", icon: Folder, shortcut: "P" },
    { value: "about",    label: "About",    href: "/about",    icon: User,   shortcut: "A" },
    { value: "contact",  label: "Contact",  href: "/contact",  icon: Mail,   shortcut: "C" },
];

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const navigate = (href: string) => {
        router.push(href as any);
        setOpen(false);
    };

    return (
        <>
            {/* Mobile trigger */}
            <button
                onClick={() => setOpen(true)}
                className="md:hidden fixed top-5 right-5 z-40 w-10 h-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Open Menu"
            >
                <Menu size={18} className="text-[#FDFCF0]" />
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center pt-[18vh] px-4"
                    onClick={() => setOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

                    <Command
                        className="relative w-full max-w-md bg-[#080808] border border-white/[0.1] rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden font-mono"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search input */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.07]">
                            <Search size={15} className="text-white/30 shrink-0" />
                            <Command.Input
                                placeholder="Search or jump to..."
                                className="flex-1 bg-transparent border-none outline-none placeholder:text-white/25 text-sm text-white/80 focus:ring-0 caret-white/60"
                                autoFocus
                            />
                            <kbd className="text-[10px] text-white/20 bg-white/5 border border-white/10 px-2 py-1 rounded-md tracking-widest">
                                ESC
                            </kbd>
                        </div>

                        <Command.List
                            className="py-3 max-h-[55vh] md:max-h-[320px] overflow-y-auto overscroll-contain"
                            data-lenis-prevent="true"
                        >
                            <Command.Empty className="py-10 text-center text-xs text-white/30 tracking-widest uppercase">
                                No results found
                            </Command.Empty>

                            {/* Navigation group */}
                            <div className="px-3 mb-1">
                                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/25 px-2 pb-2">
                                    Navigation
                                </p>
                                {NAV_ITEMS.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = pathname === item.href;
                                    return (
                                        <Command.Item
                                            key={item.value}
                                            value={item.value}
                                            onSelect={() => navigate(item.href)}
                                            className="group flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-150 outline-none aria-selected:bg-white/[0.07] hover:bg-white/[0.07]"
                                        >
                                            {/* Icon box */}
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-colors duration-150 ${
                                                isActive
                                                    ? "bg-white border-white/20"
                                                    : "bg-white/[0.04] border-white/[0.08] group-aria-selected:bg-white/[0.08] group-aria-selected:border-white/[0.15]"
                                            }`}>
                                                <Icon size={14} className={isActive ? "text-black" : "text-white/50 group-aria-selected:text-white/80"} />
                                            </div>

                                            {/* Label */}
                                            <span className={`flex-1 text-sm tracking-wide ${isActive ? "text-white font-bold" : "text-white/60 group-aria-selected:text-white/90"}`}>
                                                {item.label}
                                            </span>

                                            {/* Active badge */}
                                            {isActive && (
                                                <span className="text-[9px] font-mono tracking-widest uppercase text-white/30 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                                                    current
                                                </span>
                                            )}

                                            {/* Arrow on hover */}
                                            {!isActive && (
                                                <ArrowRight size={13} className="text-white/0 group-aria-selected:text-white/30 transition-colors duration-150" />
                                            )}
                                        </Command.Item>
                                    );
                                })}
                            </div>

                            {/* Divider */}
                            <div className="mx-3 my-2 h-px bg-white/[0.06]" />

                            {/* Settings group */}
                            <div className="px-3">
                                <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/25 px-2 pb-2">
                                    Settings
                                </p>
                                <Command.Item
                                    value="language switch"
                                    onSelect={() => {
                                        router.replace(pathname, {
                                            locale: locale === "en" ? "id" : "en",
                                        });
                                        setOpen(false);
                                    }}
                                    className="group flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all duration-150 outline-none aria-selected:bg-white/[0.07] hover:bg-white/[0.07]"
                                >
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/[0.04] border border-white/[0.08] group-aria-selected:bg-white/[0.08] group-aria-selected:border-white/[0.15] transition-colors duration-150">
                                        <Globe size={14} className="text-white/50 group-aria-selected:text-white/80" />
                                    </div>
                                    <span className="flex-1 text-sm text-white/60 group-aria-selected:text-white/90 tracking-wide">
                                        Switch to {locale === "en" ? "Indonesian" : "English"}
                                    </span>
                                    <span className="text-[10px] font-mono text-white/25 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                                        {locale === "en" ? "ID" : "EN"}
                                    </span>
                                </Command.Item>
                            </div>
                        </Command.List>

                        {/* Footer hint */}
                        <div className="px-5 py-3 border-t border-white/[0.07] flex items-center justify-between">
                            <div className="flex items-center gap-4 text-[10px] text-white/20 font-mono">
                                <span className="flex items-center gap-1.5">
                                    <kbd className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[9px]">↑↓</kbd>
                                    navigate
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <kbd className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[9px]">↵</kbd>
                                    select
                                </span>
                            </div>
                            <span className="text-[10px] font-mono text-white/15 tracking-widest">NAUFAL.</span>
                        </div>
                    </Command>
                </div>
            )}
        </>
    );
}
