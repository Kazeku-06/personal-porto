"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Folder, User, Home, Globe, Mail, Menu, ArrowRight } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";

const NAV_ITEMS = [
    { value: "home",     label: "Home",     href: "/",        icon: Home,   shortcut: "H", color: "#FFE566" },
    { value: "projects", label: "Projects", href: "/projects", icon: Folder, shortcut: "P", color: "#B8F5A0" },
    { value: "about",    label: "About",    href: "/about",    icon: User,   shortcut: "A", color: "#A8D8FF" },
    { value: "contact",  label: "Contact",  href: "/contact",  icon: Mail,   shortcut: "C", color: "#FFB3C6" },
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
                className="md:hidden fixed top-5 right-5 z-40 w-10 h-10 bg-[#FFFBF0] border-3 border-[#0a0a0a] flex items-center justify-center neo-shadow hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                aria-label="Open Menu"
            >
                <Menu size={18} className="text-[#0a0a0a]" />
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
                    onClick={() => setOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-[#0a0a0a]/60" />

                    {/* Offset shadow layer */}
                    <div className="relative w-full max-w-md">
                        <div className="absolute top-2 left-2 w-full h-full bg-[#0a0a0a] z-0" />

                        <Command
                            className="relative w-full bg-[#FFFBF0] border-3 border-[#0a0a0a] overflow-hidden font-mono z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Search input */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b-3 border-[#0a0a0a] bg-[#FFE566]">
                                <Search size={16} className="text-[#0a0a0a] shrink-0" />
                                <Command.Input
                                    placeholder="Search or jump to..."
                                    className="flex-1 bg-transparent border-none outline-none placeholder:text-[#0a0a0a]/50 text-sm text-[#0a0a0a] font-black focus:ring-0 caret-[#0a0a0a]"
                                    autoFocus
                                />
                                <kbd className="text-[10px] text-[#0a0a0a] bg-[#FFFBF0] border-2 border-[#0a0a0a] px-2 py-1 font-black tracking-widest">
                                    ESC
                                </kbd>
                            </div>

                            <Command.List
                                className="py-3 max-h-[55vh] md:max-h-[320px] overflow-y-auto overscroll-contain"
                                data-lenis-prevent="true"
                            >
                                <Command.Empty className="py-10 text-center text-xs text-[#0a0a0a]/50 tracking-widest uppercase font-bold">
                                    No results found
                                </Command.Empty>

                                {/* Navigation group */}
                                <div className="px-3 mb-1">
                                    <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#0a0a0a]/40 px-2 pb-2">
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
                                                className="group flex items-center gap-3 px-3 py-3 cursor-pointer transition-all duration-100 outline-none aria-selected:bg-[#0a0a0a]/5 hover:bg-[#0a0a0a]/5"
                                            >
                                                {/* Icon box */}
                                                <div
                                                    className="w-9 h-9 border-3 border-[#0a0a0a] flex items-center justify-center shrink-0 transition-all duration-100"
                                                    style={{
                                                        backgroundColor: isActive ? "#0a0a0a" : item.color,
                                                        boxShadow: isActive ? "none" : "2px 2px 0px #0a0a0a",
                                                    }}
                                                >
                                                    <Icon size={14} className={isActive ? "text-[#FFFBF0]" : "text-[#0a0a0a]"} />
                                                </div>

                                                {/* Label */}
                                                <span className={`flex-1 text-sm font-black tracking-wide ${isActive ? "text-[#0a0a0a]" : "text-[#0a0a0a]/70 group-aria-selected:text-[#0a0a0a]"}`}>
                                                    {item.label}
                                                </span>

                                                {/* Active badge */}
                                                {isActive && (
                                                    <span className="text-[9px] font-black tracking-widest uppercase text-[#0a0a0a] bg-[#FFE566] border-2 border-[#0a0a0a] px-2 py-0.5">
                                                        current
                                                    </span>
                                                )}

                                                {/* Arrow on hover */}
                                                {!isActive && (
                                                    <ArrowRight size={13} className="text-transparent group-aria-selected:text-[#0a0a0a]/40 transition-colors duration-100" />
                                                )}
                                            </Command.Item>
                                        );
                                    })}
                                </div>

                                {/* Divider */}
                                <div className="mx-3 my-2 h-[3px] bg-[#0a0a0a]" />

                                {/* Settings group */}
                                <div className="px-3">
                                    <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#0a0a0a]/40 px-2 pb-2">
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
                                        className="group flex items-center gap-3 px-3 py-3 cursor-pointer transition-all duration-100 outline-none aria-selected:bg-[#0a0a0a]/5 hover:bg-[#0a0a0a]/5"
                                    >
                                        <div className="w-9 h-9 border-3 border-[#0a0a0a] bg-[#D4B8FF] flex items-center justify-center transition-all duration-100"
                                            style={{ boxShadow: "2px 2px 0px #0a0a0a" }}>
                                            <Globe size={14} className="text-[#0a0a0a]" />
                                        </div>
                                        <span className="flex-1 text-sm font-black text-[#0a0a0a]/70 group-aria-selected:text-[#0a0a0a] tracking-wide">
                                            Switch to {locale === "en" ? "Indonesian" : "English"}
                                        </span>
                                        <span className="text-[10px] font-black text-[#0a0a0a] bg-[#D4B8FF] border-2 border-[#0a0a0a] px-2 py-0.5">
                                            {locale === "en" ? "ID" : "EN"}
                                        </span>
                                    </Command.Item>
                                </div>
                            </Command.List>

                            {/* Footer hint */}
                            <div className="px-5 py-3 border-t-3 border-[#0a0a0a] bg-[#0a0a0a] flex items-center justify-between">
                                <div className="flex items-center gap-4 text-[10px] text-[#FFFBF0]/60 font-mono font-bold">
                                    <span className="flex items-center gap-1.5">
                                        <kbd className="bg-[#FFFBF0]/10 border border-[#FFFBF0]/20 px-1.5 py-0.5 text-[9px] text-[#FFFBF0]">↑↓</kbd>
                                        navigate
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <kbd className="bg-[#FFFBF0]/10 border border-[#FFFBF0]/20 px-1.5 py-0.5 text-[9px] text-[#FFFBF0]">↵</kbd>
                                        select
                                    </span>
                                </div>
                                <span className="text-[10px] font-black text-[#FFFBF0]/40 tracking-widest">NAUFAL.</span>
                            </div>
                        </Command>
                    </div>
                </div>
            )}
        </>
    );
}
