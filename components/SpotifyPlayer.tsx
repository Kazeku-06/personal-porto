"use client";

import { useEffect, useState } from "react";
import { Music } from "lucide-react";
import Image from "next/image";

type SpotifyData = {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    albumImageUrl?: string;
    songUrl?: string;
};

export default function SpotifyPlayer() {
    const [data, setData] = useState<SpotifyData>({ isPlaying: false });

    useEffect(() => {
        const fetchSpotify = async () => {
            try {
                const res = await fetch("/api/spotify");
                const json = await res.json();
                setData(json);
            } catch (e) { }
        };

        fetchSpotify();
        const interval = setInterval(fetchSpotify, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <a
            href={data.songUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-40 flex items-center gap-3 p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-colors md:max-w-[200px] hover:max-w-xs max-w-[200px] overflow-hidden group"
        >
            {data.isPlaying && data.albumImageUrl ? (
                <Image src={data.albumImageUrl} alt="Album Art" width={32} height={32} className="rounded-full animate-[spin_4s_linear_infinite]" />
            ) : (
                <div className="min-w-[32px] min-h-[32px] rounded-full bg-white/10 flex items-center justify-center">
                    <Music size={14} className="opacity-50" />
                </div>
            )}

            <div className="flex-1 flex flex-col justify-center overflow-hidden whitespace-nowrap">
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#1DB954] mb-0.5">
                    {data.isPlaying ? "Now Playing" : "Not Playing"}
                </p>
                <p className={`text-xs truncate transition-all ${data.isPlaying ? 'font-medium group-hover:underline' : 'opacity-50'}`}>
                    {data.isPlaying ? (
                        <>{data.title} <span className="opacity-50">— {data.artist}</span></>
                    ) : (
                        "Spotify is idle"
                    )}
                </p>
            </div>
        </a>
    );
}
