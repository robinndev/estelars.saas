"use client";

import { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

export const MusicPlayer = ({ videoId }: { videoId: string }) => {
  const playerRef = useRef<any>(null);

  const [playerReady, setPlayerReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(60);

  const opts = {
    height: "1",
    width: "1",
    playerVars: {
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      rel: 0,
      mute: 0,
    },
  };

  const getPlayer = () => playerRef.current?.target;

  useEffect(() => {
    if (!playerReady) return;
    getPlayer()?.setVolume(volume);
  }, [volume, playerReady]);

  const togglePlay = () => {
    const player = getPlayer();
    if (!player) return;

    if (playing) {
      player.pauseVideo();
      setPlaying(false);
    } else {
      player.playVideo();
      setPlaying(true);
    }
  };

  const toggleMute = () => {
    const p = getPlayer();
    if (!p) return;

    if (muted) {
      p.unMute();
      setMuted(false);
    } else {
      p.mute();
      setMuted(true);
    }
  };

  return (
    <div
      className="
        bg-white/10 
        rounded-2xl 
        backdrop-blur-xl 
        shadow-xl 
        border border-white/20 
        flex flex-col lg:flex-col p-4 lg:p-6 
        gap-4 lg:gap-6
        w-full
      "
    >
      {/* DESKTOP VERSION */}
      <div className="hidden lg:flex flex-col items-center gap-6">
        <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={`https://static1.purepeople.com.br/articles/1/38/60/01/@/4433559-no-filme-enrolados-a-princesa-rapunze-1200x0-2.jpg`}
            className="w-full h-full object-cover"
          />
        </div>

        <button
          onClick={togglePlay}
          className="bg-white/30 hover:bg-white/40 p-5 rounded-full shadow-lg text-white transition-all"
        >
          {playing ? <FaPause size={26} /> : <FaPlay size={26} />}
        </button>

        <div className="flex items-center gap-4 w-full">
          <button
            onClick={toggleMute}
            className="text-white hover:text-gray-200 transition"
          >
            {muted ? <FaVolumeMute size={22} /> : <FaVolumeUp size={22} />}
          </button>

          <input
            type="range"
            className="w-full accent-white"
            min={0}
            max={100}
            value={muted ? 0 : volume}
            onChange={(e) => {
              const val = Number(e.target.value);
              setVolume(val);
              if (val === 0) {
                setMuted(true);
                getPlayer()?.mute();
              } else {
                setMuted(false);
                getPlayer()?.unMute();
              }
            }}
          />
        </div>
      </div>

      {/* MOBILE — Spotify Style */}
      <div className="flex lg:hidden items-center gap-4 w-full">
        {/* Small Cover */}
        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-lg shrink-0">
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Controls + Slider */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="text-white bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
            >
              {playing ? <FaPause size={18} /> : <FaPlay size={18} />}
            </button>

            <button
              onClick={toggleMute}
              className="text-white hover:text-gray-200 transition"
            >
              {muted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
            </button>
          </div>

          {/* Slider */}
          <input
            type="range"
            className="w-full accent-white"
            min={0}
            max={100}
            value={muted ? 0 : volume}
            onChange={(e) => {
              const val = Number(e.target.value);
              setVolume(val);
              if (val === 0) {
                setMuted(true);
                getPlayer()?.mute();
              } else {
                setMuted(false);
                getPlayer()?.unMute();
              }
            }}
          />
        </div>
      </div>

      {/* Invisible YouTube */}
      <div className="w-0 h-0 overflow-hidden opacity-0 pointer-events-none">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={(e) => {
            playerRef.current = e;
            setPlayerReady(true);
          }}
        />
      </div>
    </div>
  );
};
