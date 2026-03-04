"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Disable on reduced motion or touch devices
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
            window.matchMedia("(pointer: coarse)").matches) {
            if (cursorRef.current) cursorRef.current.style.display = 'none';
            return;
        }

        const cursor = cursorRef.current;
        if (!cursor) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        const interactiveElements = document.querySelectorAll("a, button, input");

        const onMouseEnter = () => {
            gsap.to(cursor, { scale: 1.5, duration: 0.2, backgroundColor: "transparent", border: "1px solid #FDFCF0" });
        };

        const onMouseLeave = () => {
            gsap.to(cursor, { scale: 1, duration: 0.2, backgroundColor: "#FDFCF0", border: "none" });
        };

        window.addEventListener("mousemove", onMouseMove);
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", onMouseEnter);
            el.addEventListener("mouseleave", onMouseLeave);
        });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", onMouseEnter);
                el.removeEventListener("mouseleave", onMouseLeave);
            });
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 w-4 h-4 bg-[#FDFCF0] rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        />
    );
}
