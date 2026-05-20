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
                className="md:hidden fixed top-4 right-5 z-40 w-10 h-10 neo-btn bg-[#FFE500] flex items-center justify-center"
                aria-label="Open Menu"
            >
                <Menu size={18} className="text-black" />
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
                    onClick={() => setOpen(false)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/40" />

                    <Command
                        className="relative w-full max-w-md bg-[#FFFBF0] border-3 border-black shadow-[6px_6px_0px_#0a0a0a] overflow-hidden font-mono"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search input */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b-3 border-black bg-[#FFE500]">
                            <Search size={16} className="text-black shrink-0" strokeWidth={2.5} />
                            <Command.Input
                                placeholder="Search or jump to..."
                                className="flex-1 bg-transparent border-none outline-none placeholder:text-black/50 text-sm text-black font-bold focus:ring-0 caret-black"
                                autoFocus
                            />
                            <kbd className="text-[10px] text-black bg-white border-2 border-black px-2 py-1 font-bold tracking-widest">
                                ESC
                            </kbd>
                        </div>

                        <Command.List
                            className="py-3 max-h-[55vh] md:max-h-[320px] overflow-y-auto overscroll-contain"
                            data-lenis-prevent="true"
                        >
                            <Command.Empty className="py-10 text-center text-xs text-black/50 tracking-widest uppercase font-bold">
                                No results found
                            </Command.Empty>

                            {/* Navigation group */}
                            <div className="px-3 mb-1">
                                <p className="text-[10px] font-black tracking-[0.3em] uppercase text-black/40 px-2 pb-2">
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
                                            className="group flex items-center gap-3 px-3 py-3 cursor-pointer transition-all duration-100 outline-none aria-selected:bg-[#FFE500] hover:bg-[#FFE500] border-2 border-transparent aria-selected:border-black hover:border-black mb-1"
                                        >
                                            {/* Icon box */}
                                            <div className={`w-8 h-8 border-2 border-black flex items-center justify-center transition-colors duration-100 ${
                                                isActive
                                                    ? "bg-black"
                                                    : "bg-white group-aria-selected:bg-black"
                                            }`}>
                                                <Icon size={14} strokeWidth={2.5} className={isActive ? "text-[#FFE500]" : "text-black group-aria-selected:text-[#FFE500]"} />
                                            </div>

                                            {/* Label */}
                                            <span className={`flex-1 text-sm font-bold tracking-wide ${isActive ? "text-black" : "text-black/70 group-aria-selected:text-black"}`}>
                                                {item.label}
                                            </span>

                                            {/* Active badge */}
                                            {isActive && (
                                                <span className="text-[9px] font-black tracking-widest uppercase text-black bg-white border-2 border-black px-2 py-0.5">
                                                    current
                                                </span>
                                            )}

                                            {/* Arrow on hover */}
                                            {!isActive && (
                                                <ArrowRight size={14} strokeWidth={2.5} className="text-transparent group-aria-selected:text-black transition-colors duration-100" />
                                            )}
                                        </Command.Item>
                                    );
                                })}
                            </div>

                            {/* Divider */}
                            <div className="mx-3 my-2 h-[3px] bg-black" />

                            {/* Settings group */}
                            <div className="px-3">
                                <p className="text-[10px] font-black tracking-[0.3em] uppercase text-black/40 px-2 pb-2">
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
                                    className="group flex items-center gap-3 px-3 py-3 cursor-pointer transition-all duration-100 outline-none aria-selected:bg-[#4ECDC4] hover:bg-[#4ECDC4] border-2 border-transparent aria-selected:border-black hover:border-black"
                                >
                                    <div className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center group-aria-selected:bg-black transition-colors duration-100">
                                        <Globe size={14} strokeWidth={2.5} className="text-black group-aria-selected:text-[#4ECDC4]" />
                                    </div>
                                    <span className="flex-1 text-sm font-bold text-black/70 group-aria-selected:text-black tracking-wide">
                                        Switch to {locale === "en" ? "Indonesian" : "English"}
                                    </span>
                                    <span className="text-[10px] font-black text-black bg-white border-2 border-black px-2 py-0.5">
                                        {locale === "en" ? "ID" : "EN"}
                                    </span>
                                </Command.Item>
                            </div>
                        </Command.List>

                        {/* Footer hint */}
                        <div className="px-5 py-3 border-t-3 border-black bg-black flex items-center justify-between">
                            <div className="flex items-center gap-4 text-[10px] text-white font-bold">
                                <span className="flex items-center gap-1.5">
                                    <kbd className="bg-white/10 border border-white/30 px-1.5 py-0.5 text-[9px]">↑↓</kbd>
                                    navigate
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <kbd className="bg-white/10 border border-white/30 px-1.5 py-0.5 text-[9px]">↵</kbd>
                                    select
                                </span>
                            </div>
                            <span className="text-[10px] font-black text-[#FFE500] tracking-widest">NAUFAL.</span>
                        </div>
                    </Command>
                </div>
            )}
        </>
    );
}
