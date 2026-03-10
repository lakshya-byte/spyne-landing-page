"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

/**
 * LoadingScreen - Cinematic Speedometer HUD for Spyne App
 */
export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [isReadyToHide, setIsReadyToHide] = useState(false);
  const [isDestroyed, setIsDestroyed] = useState(false);

  // Avoid hydration mismatch by only rendering on client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // We require a minimum of 2.5 seconds of display time for the cinematic effect
    const startTime = Date.now();

    const checkReady = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const isLoaded =
        progress >= 100 || (!active && progress > 0) || elapsed > 10000; // fail-safe 10s

      if (elapsed > 2500 && isLoaded) {
        setIsReadyToHide(true);
        clearInterval(checkReady);

        // Destroy component fully after fade-out transition (1s)
        setTimeout(() => setIsDestroyed(true), 1200);
      }
    }, 100);

    return () => clearInterval(checkReady);
  }, [mounted, progress, active]);

  if (!mounted || isDestroyed) return null;

  const safeProgress = Math.min(100, Math.max(0, progress || 0));
  const displayProgress = isReadyToHide ? 100 : safeProgress;

  const strokeDashoffset = 283 - (displayProgress / 100) * 283;
  const dialRotation = (displayProgress / 100) * 270 - 135;

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-[#120b08] font-mono text-slate-100 overflow-hidden transition-opacity duration-1000 ease-in-out pointer-events-none
        ${isReadyToHide ? "opacity-0" : "opacity-100"}
      `}
      style={{ zIndex: 9999 }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .dial-gradient {
            background: radial-gradient(circle at center, rgba(236, 91, 19, 0.15) 0%, transparent 70%);
        }
        .glass-effect {
            backdrop-filter: blur(10px);
            border: 1px solid rgba(236, 91, 19, 0.2);
        }
        .grid-bg {
            background-image: linear-gradient(rgba(236, 91, 19, 0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(236, 91, 19, 0.05) 1px, transparent 1px);
            background-size: 40px 40px;
        }
        .rim-light {
            box-shadow: 0 0 20px rgba(236, 91, 19, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.1);
        }
      `,
        }}
      />

      {/* Cinematic Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#120b08]/80 to-[#120b08]" />

      {/* HUD Elements Corner Top-Left */}
      <div className="absolute top-8 left-8 flex flex-col gap-1 opacity-60">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] text-primary uppercase font-bold">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          System Status: Active
        </div>
        <div className="text-[9px] text-slate-500 font-mono">
          CORE_LATENCY: 0.002ms
        </div>
      </div>

      {/* HUD Elements Corner Top-Right */}
      <div className="absolute top-8 right-8 text-right flex flex-col gap-1 opacity-60">
        <div className="text-[10px] tracking-[0.2em] text-slate-400 uppercase font-bold">
          SPYNE_OS_V4.2
        </div>
        <div className="text-[9px] text-primary font-mono italic">
          ENCRYPTED_LINK_ESTABLISHED
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 w-full max-w-2xl mx-auto">
        {/* Speedometer Dial Container */}
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center rounded-full glass-effect rim-light dial-gradient mb-12">
          {/* Circular Progress SVG */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 scale-90"
            viewBox="0 0 100 100"
          >
            {/* Background track */}
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="45"
              stroke="rgba(236, 91, 19, 0.1)"
              strokeWidth="2"
            />
            {/* Active track */}
            <circle
              cx="50"
              cy="50"
              fill="none"
              r="45"
              stroke="#ec5b13"
              strokeDasharray="283"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeWidth="3"
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Ticks & Markers */}
          <div className="absolute inset-4 rounded-full border border-primary/10 flex items-center justify-center">
            <div className="absolute inset-0 border-[1px] border-dashed border-primary/20 rounded-full" />
          </div>

          {/* Central Content */}
          <div className="flex flex-col items-center text-center">
            <span className="text-6xl sm:text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(236,91,19,0.5)] flex items-end">
              {Math.round(progress)}
              <span className="text-3xl text-primary font-normal pb-2">%</span>
            </span>
            <div className="mt-2 h-[1px] w-16 bg-primary/40" />
            <span className="mt-4 text-[10px] tracking-[0.4em] uppercase text-primary font-bold">
              {progress < 100 ? "Processing" : "Ready"}
            </span>
          </div>

          {/* Dial Needle Visual */}
          <div
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${dialRotation}deg)` }}
          >
            <div className="h-full w-1 flex flex-col items-center">
              <div className="w-1 h-1/2 bg-gradient-to-t from-transparent to-primary rounded-full shadow-[0_0_10px_#ec5b13]" />
            </div>
          </div>
        </div>

        {/* Progress Bar Details */}
        <div className="w-full max-w-md flex flex-col gap-4">
          <div className="flex justify-between items-end px-1">
            <div className="flex flex-col">
              <h2 className="text-xl font-bold text-white tracking-wide font-sans">
                Initializing AI Studio
              </h2>
              <p className="text-primary text-xs font-medium tracking-[0.1em] uppercase font-sans">
                Spyne Digital Cluster
              </p>
            </div>
            <span className="text-slate-400 text-sm font-mono tracking-tighter">
              {((progress / 100) * 10).toFixed(1)} / 10.0 VRAM
            </span>
          </div>

          {/* Custom Progress Bar */}
          <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-primary shadow-[0_0_10px_rgba(236,91,19,0.8)] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between px-1">
            <p className="text-slate-500 text-[10px] font-medium uppercase tracking-widest font-sans">
              Minimalist HUD Active
            </p>
            <div className="flex gap-2 text-primary text-xs">
              <span>MEM</span>
              <span>HUB</span>
              <span>AI</span>
            </div>
          </div>
        </div>

        {/* Bottom Cluster Preview Grid */}
        <div className="mt-12 grid grid-cols-4 gap-4 w-full max-w-lg opacity-40">
          <div className="aspect-video bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-center overflow-hidden">
            <div
              className="w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAeXwGhyMMecIMHfnGX0KcHUk-oCxLECdsfxkRyRI-cdEFKBAP4W3h9X3jxU28veisKLSqv83MOfAYMif4IjgJOQLvkgehpzjO6zgeAe4Fu4-1nicrZuhDWsBFKIvWCDgd-dT4jvNKDueuBP-d2yu97mXb5YW9-JEGUkeg0tk25zpQ0la5Ss7SSIf4VMjfeflCTtsqh3a8arVUaF1V7rfKA6b65y6h3tQXTjI9kVvoLq6jpRPg8abbQeHMdZrwxKvemh22hGVNZmpc")',
              }}
            />
          </div>
          <div className="aspect-video bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-center overflow-hidden">
            <div
              className="w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSid9F2ylSpqr41Uus7GZOob-ZYsWOPcND9ijDKlvMPreN275CdFb6zWzlVkjP0jpWPEGsWrQNL81YrKnLDYE5mTKAs30-ltEL39OsJkg5WBf-qYArTFdOjk6IlQKO79SpnRvXHlQxWJGxPnhrRIG1L2KnpQXCXWefhAni_wsD_WvdJHpb0cQojUL9oWoHhZmxkhqnx9h4h1_g-aKT-zXvMCYWKE0ppxyygkcOqQY8u6VS4G1tOJIxrRRdn1fLpSdoZRo6lNUNTGE")',
              }}
            />
          </div>
          <div className="aspect-video bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-center overflow-hidden">
            <div
              className="w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBPQLQoikx4YlryMsKAIqTK8xhlehu819t46FQc8H-xtXeieN4EviKOvWvqsp4aPfCbBPc99JqHleQ5A3A5WTEeMrwadY00BjMcxrFW1Cln4RwiIRekMsNnM5644DGf65NtthKIQN5x3dZDVmRDwi-ehen9695zniRCFmIeAkiPqbflCUp0MRZVRnTTtEjZY3ZI0P43IeFf3oaZLwp7oB6Mbyom7cVLhTfFsJKOViZZZ2B7eRuLATLAFt7nM4pzNIUY55pKHIRiQQQ")',
              }}
            />
          </div>
          <div className="aspect-video bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-center overflow-hidden">
            <div
              className="w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBW1N48pSjZ7htC9oC-7xzfeUPySdg8zygvYpBezA_COU5HkS7HtbVynlzzWkP1j2EXlOGCt97907yGxj0icyBy7EasA2zq1uw4QVKsEzDEyOrxV7cLs2Tspyk5KDIcnYO8zrDyfmQEWLA_MducAyZk_W_iALg_-ZeH7sCFGv0wqNwwys7lJHQTGJK0g10QZdi-cuNM0p0lJz5yAq2NEgPDTkoyDTl-6RFDdDOA1NG_fe-okQKyH2DOk2uhKJxi-jXT6sMzrqSOhHs")',
              }}
            />
          </div>
        </div>
      </div>

      {/* HUD Elements Corner Bottom-Left */}
      <div className="absolute bottom-8 left-8 flex items-center gap-4 opacity-40">
        <div className="flex flex-col">
          <div className="text-[9px] text-slate-500 uppercase">Engine_Ref</div>
          <div className="text-sm font-bold text-slate-300">V12_HYBRID</div>
        </div>
        <div className="h-8 w-[1px] bg-slate-700" />
        <div className="flex flex-col">
          <div className="text-[9px] text-slate-500 uppercase">Temp</div>
          <div className="text-sm font-bold text-slate-300">92°C</div>
        </div>
      </div>

      {/* HUD Elements Corner Bottom-Right */}
      <div className="absolute bottom-8 right-8 flex flex-col items-end opacity-40">
        <div className="text-[9px] text-slate-500 uppercase mb-1">
          Session_ID
        </div>
        <div className="bg-primary/10 px-2 py-0.5 border border-primary/30 rounded text-[10px] font-mono text-primary">
          S-8921-AI-CLUSTER
        </div>
      </div>
    </div>
  );
}
