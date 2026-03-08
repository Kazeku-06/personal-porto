"use client";

import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { Search, Folder, User, Home, Globe, Mail } from "lucide-react";
import { useRouter, usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "/" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-[20vh]" onClick={() => setOpen(false)}>
            <Command
                className="w-full max-w-lg bg-[#0a0a0a] text-[#FDFCF0] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center border-b border-white/10 px-4">
                    <Search size={18} className="opacity-50" />
                    <Command.Input
                        placeholder="Type a command or search..."
                        className="w-full bg-transparent border-none p-4 outline-none placeholder:text-white/30 text-sm focus:ring-0"
                        autoFocus
                    />
                </div>

                <Command.List className="p-2 max-h-[300px] overflow-y-auto no-scrollbar">
                    <Command.Empty className="p-4 text-center text-sm opacity-50">No results found.</Command.Empty>

                    <Command.Group heading="Navigation" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-[#FDFCF0]/40 [&_[cmdk-group-heading]]:font-bold mt-2">
                        <Command.Item
                            value="home"
                            onSelect={() => { router.push('/'); setOpen(false); }}
                            className="flex items-center gap-3 p-3 mx-1 rounded-lg hover:bg-white/10 cursor-pointer transition-colors text-sm text-[#FDFCF0] outline-none data-[selected=true]:bg-white/10 aria-selected:bg-white/10"
                        >
                            <Home size={16} className="opacity-60" /> Home
                        </Command.Item>
                        <Command.Item
                            value="projects"
                            onSelect={() => { router.push('/projects'); setOpen(false); }}
                            className="flex items-center gap-3 p-3 mx-1 rounded-lg hover:bg-white/10 cursor-pointer transition-colors text-sm text-[#FDFCF0] outline-none data-[selected=true]:bg-white/10 aria-selected:bg-white/10"
                        >
                            <Folder size={16} className="opacity-60" /> Projects
                        </Command.Item>
                        <Command.Item
                            value="about"
                            onSelect={() => { router.push('/about'); setOpen(false); }}
                            className="flex items-center gap-3 p-3 mx-1 rounded-lg hover:bg-white/10 cursor-pointer transition-colors text-sm text-[#FDFCF0] outline-none data-[selected=true]:bg-white/10 aria-selected:bg-white/10"
                        >
                            <User size={16} className="opacity-60" /> About
                        </Command.Item>
                        <Command.Item
                            value="contact"
                            onSelect={() => { router.push('/contact'); setOpen(false); }}
                            className="flex items-center gap-3 p-3 mx-1 rounded-lg hover:bg-white/10 cursor-pointer transition-colors text-sm text-[#FDFCF0] outline-none data-[selected=true]:bg-white/10 aria-selected:bg-white/10"
                        >
                            <Mail size={16} className="opacity-60" /> Contact
                        </Command.Item>
                    </Command.Group>

                    <Command.Group heading="Settings" className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-[#FDFCF0]/40 [&_[cmdk-group-heading]]:font-bold [&_[cmdk-group-heading]]:border-t [&_[cmdk-group-heading]]:border-white/10 mt-4 pt-2">
                        <Command.Item
                            value="language"
                            onSelect={() => {
                                router.replace(pathname, { locale: locale === 'en' ? 'id' : 'en' });
                                setOpen(false);
                            }}
                            className="flex items-center gap-3 p-3 mx-1 rounded-lg hover:bg-white/10 cursor-pointer transition-colors text-sm text-[#FDFCF0] outline-none data-[selected=true]:bg-white/10 aria-selected:bg-white/10"
                        >
                            <Globe size={16} className="opacity-60" /> Switch to {locale === 'en' ? 'Indonesian' : 'English'}
                        </Command.Item>
                    </Command.Group>
                </Command.List>
            </Command>
        </div>
    );
}
