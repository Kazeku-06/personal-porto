"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "@/i18n/routing";

export default function CustomCursor() {
    const pathname = usePathname();
    const cursorRef = useRef<HTMLDivElement>(null);

    const isCustomCursorPage = pathname === "/projects" || pathname === "/contact";

    useEffect(() => {
        // Disable on reduced motion or touch devices, or if not on specified pages
        if (!isCustomCursorPage ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            window.matchMedia("(pointer: coarse)").matches) {

            document.body.classList.remove("custom-cursor-active");
            if (cursorRef.current) cursorRef.current.style.display = 'none';
            return;
        }

        document.body.classList.add("custom-cursor-active");
        if (cursorRef.current) cursorRef.current.style.display = 'block';

        const cursor = cursorRef.current;
        if (!cursor) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, input, [role='button'], .cursor-pointer")) {
                gsap.to(cursor, { scale: 1.5, duration: 0.2, backgroundColor: "transparent", border: "1px solid #FDFCF0" });
            }
        };

        const onMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, input, [role='button'], .cursor-pointer")) {
                gsap.to(cursor, { scale: 1, duration: 0.2, backgroundColor: "#FDFCF0", border: "none" });
            }
        };

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseout", onMouseOut);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
            document.body.classList.remove("custom-cursor-active");
        };
    }, [isCustomCursorPage]);

    if (!isCustomCursorPage) return null;

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 bg-[#FDFCF0] rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        />
    );
}
