"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {SYNDROMES, GameState, Attempt, InfoCard} from "./types"
import { getAttemptedIndices, addAttempted, clearAttempted, getAttemptedMap } from "./cookie"
import Image from "next/image"
import {LowFotter, InfoCardComp} from "./components"
import Link from "next/link"

// ─── Types ────────────────────────────────────────────────────────────────────



const MAX_CLUES = 6;
const SYNDROME_NAMES = SYNDROMES.map((s) => s.name);

// Rotating left-border accent colours (all blue-family tones)
const CLUE_ACCENT = [
  "border-l-blue-400",
  "border-l-sky-400",
  "border-l-indigo-400",
  "border-l-cyan-400",
  "border-l-blue-500",
  "border-l-sky-500",
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function GeneticlePage() {
  

  // Start at 0 on the server to avoid hydration mismatch; pick proper index on mount
  const [syndromeIndex, setSyndromeIndex] = useState<number>(0);

  useEffect(() => {
    try {
      // If index provided in query params and valid, use it. Use window.location
      // to avoid client-only next/navigation helpers that can cause build issues.
      const q = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get('index') : null;
      if (q) {
        const qi = Number(q);
        if (!Number.isNaN(qi) && qi >= 0 && qi < SYNDROMES.length) {
          setSyndromeIndex(qi);
          return;
        }
      }

      // Otherwise pick the first unattempted sequentially (no randomization)
      const attempted = getAttemptedIndices();
      for (let i = 0; i < SYNDROMES.length; i++) {
        if (!attempted.includes(i)) {
          setSyndromeIndex(i);
          setAllAttempted(false);
          return;
        }
      }
      // all attempted — show reset UI instead of clearing automatically
      setAllAttempted(true);
      setSyndromeIndex(0);
    } catch {
      setSyndromeIndex(0);
    }
  }, []);
  const [cluesRevealed, setCluesRevealed] = useState(0);
  const [selected, setSelected] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [gameState, setGameState] = useState<GameState>("playing");
  const [newClueIndex, setNewClueIndex] = useState<number | null>(null);
  const [showAllClues, setShowAllClues] = useState(false);
  const [allAttempted, setAllAttempted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const syndrome = SYNDROMES[syndromeIndex];
  const maxGuesses = MAX_CLUES + 1;
  const guessesLeft = maxGuesses - attempts.length;
  const filteredOptions = useMemo(() => {
    const guessedNames = attempts.map((a) => a.guess);
    const opts = SYNDROME_NAMES.filter(
      (name) => !guessedNames.includes(name) && name.toLowerCase().includes(search.toLowerCase())
    );
    // Fisher-Yates shuffle
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [search, attempts]);
  const wrongAttempts = attempts.filter((a) => !a.correct);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleGuess() {
    if (!selected) return;
    const correct = selected === syndrome.name;
    const newAttempts: Attempt[] = [...attempts, { guess: selected, correct }];
    setAttempts(newAttempts);
    setSelected("");
    setSearch("");
    setDropdownOpen(false);

    if (correct) {
      setGameState("won");
    } else if (newAttempts.length >= maxGuesses) {
      setGameState("lost");
    } else {
      const nextClue = cluesRevealed;
      if (nextClue < syndrome.clues.length) {
        setNewClueIndex(nextClue);
        setCluesRevealed((c) => c + 1);
      }
    }
  }

  function newGame() {
    // Find the next unattempted case (wrap around). If none, show reset UI.
    const attempted = getAttemptedIndices();
    let found: number | null = null;
    for (let i = 1; i <= SYNDROMES.length; i++) {
      const candidate = (syndromeIndex + i) % SYNDROMES.length;
      if (!attempted.includes(candidate)) {
        found = candidate;
        break;
      }
    }
    if (found === null) {
      // all attempted
      setAllAttempted(true);
      return;
    }
    setSyndromeIndex(found);
    setCluesRevealed(0);
    setSelected("");
    setSearch("");
    setDropdownOpen(false);
    setAttempts([]);
    setGameState("playing");
    setNewClueIndex(null);
    setShowAllClues(false);
  }

  // When a case is finished, mark it as attempted with status
  useEffect(() => {
    if (gameState === "won" || gameState === "lost") {
      try {
        addAttempted(syndromeIndex, gameState);
      } catch {}
    }
  }, [gameState, syndromeIndex]);

  if (!mounted) return null;

  if (allAttempted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 px-4 py-8 sm:py-12">
        <div className="mx-auto w-full max-w-xl">
          <div className="mb-4 rounded-2xl border border-blue-100 bg-yellow-50 px-4 py-4 text-sm text-yellow-900 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>All cases have been attempted. Reset progress to play again.</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    clearAttempted();
                    setAllAttempted(false);
                    setSyndromeIndex(0);
                    setCluesRevealed(0);
                    setSelected("");
                    setSearch("");
                    setDropdownOpen(false);
                    setAttempts([]);
                    setGameState("playing");
                    setNewClueIndex(null);
                    setShowAllClues(false);
                  }}
                  className="rounded-md bg-yellow-600 px-3 py-2 text-white text-sm hover:opacity-90"
                >
                  Reset progress
                </button>
                <Link href="/dashboard" className="text-sm text-blue-700 hover:underline">Dashboard</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-xl">

        

        {/* ── Header card ───────────────────────────────────────────────── */}
        <div className="mb-4 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 shadow-lg shadow-blue-200">
          <div className="flex items-center justify-between px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-3">
              {/* DNA icon using SVG to avoid icon-lib dependency */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Image src="/geneticle_g.png" alt="geneticle logo" width={100} height={300} />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Geneticle
                </h1>
                <p className="mt-0.5 text-sm text-blue-100">
                  Diagnose the syndrome — fewest clues wins
                </p>
              </div>
            </div>
            <button
              onClick={newGame}
              className="flex shrink-0 items-center gap-1.5 rounded-xl border border-white/30 bg-white/15 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/25 active:scale-95"
            >
              {/* Refresh icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              New case
            </button>
            <div className="hidden sm:flex sm:items-center sm:gap-2">
              <Link href="/dashboard" className="text-sm rounded-md bg-white/10 px-3 py-1 text-white hover:bg-white/20">Dashboard</Link>
              <Link href="/" className="text-sm rounded-md bg-white/10 px-3 py-1 text-white hover:bg-white/20">Home</Link>
            </div>
          </div>
        </div>

        {/* ── Attempt tracker ───────────────────────────────────────────── */}
        {gameState === "playing" && (
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-blue-100 bg-white px-4 py-3 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              Attempts
            </span>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: maxGuesses }).map((_, i) => {
                const att = attempts[i];
                return (
                  <div
                    key={i}
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs transition-all duration-200 ${
                      att
                        ? att.correct
                          ? "border-emerald-400 bg-emerald-400 text-white"
                          : "border-red-400 bg-red-400 text-white"
                        : "border-dashed border-blue-200 bg-transparent"
                    }`}
                  >
                    {att &&
                      (att.correct ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      ))}
                  </div>
                );
              })}
            </div>
            <span className="ml-auto text-xs text-slate-400">{guessesLeft} left</span>
          </div>
        )}

        {/* ── Presenting case card ──────────────────────────────────────── */}
        <div className="mb-3 overflow-hidden rounded-2xl border border-blue-200 bg-white shadow-sm">
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M9 12h6M9 16h4" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-widest text-white">
              Presenting case
            </span>
          </div>
          <div className="px-5 py-4">
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <circle cx="12" cy="8" r="4" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
              {syndrome.initialPrompt.age}
            </span>
            <p className="text-sm leading-relaxed text-slate-700">
              <span className="font-semibold text-slate-900">
                Presenting complaint:{" "}
              </span>
              {syndrome.initialPrompt.complaint}
            </p>
          </div>
        </div>

        {/* ── Clue cards ────────────────────────────────────────────────── */}
        {Array.from({ length: cluesRevealed }).map((_, i) => (
          <div
            key={i}
            className={`mb-2.5 rounded-xl border border-blue-100 bg-white px-5 py-4 text-sm leading-relaxed text-slate-700 shadow-sm border-l-4 ${CLUE_ACCENT[i % CLUE_ACCENT.length]} ${
              i === newClueIndex ? "animate-[slideDown_0.35s_cubic-bezier(0.16,1,0.3,1)]" : ""
            }`}
            style={
              i === newClueIndex
                ? { animationName: "slideDown", animationDuration: "0.35s", animationTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }
                : {}
            }
          >
            {syndrome.clues[i]}
          </div>
        ))}

        {/* Remaining clues revealed on loss */}
        {gameState === "lost" &&
          showAllClues &&
          Array.from({ length: MAX_CLUES - cluesRevealed }).map((_, i) => {
            const idx = cluesRevealed + i;
            return (
              <div
                key={`rev-${idx}`}
                className={`mb-2.5 rounded-xl border border-blue-100 bg-slate-50 px-5 py-4 text-sm leading-relaxed text-slate-400 border-l-4 ${CLUE_ACCENT[idx % CLUE_ACCENT.length]} opacity-60`}
              >
                {syndrome.clues[idx]}
              </div>
            );
          })}

        {/* ── Guess input area ──────────────────────────────────────────── */}
        {gameState === "playing" && (
          <div className="mt-2 rounded-2xl border border-blue-100 bg-white px-4 py-4 shadow-sm sm:px-5">
            {/* Dropdown */}
            <div ref={dropdownRef} className="relative mb-3">
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors ${
                  dropdownOpen
                    ? "border-blue-500 ring-2 ring-blue-100"
                    : "border-blue-200 hover:border-blue-400"
                } bg-blue-50/40 text-left`}
              >
                <span className={selected ? "text-slate-800" : "text-slate-400"}>
                  {selected || "Select a syndrome…"}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`h-4 w-4 shrink-0 text-blue-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 flex max-h-56 flex-col overflow-hidden rounded-xl border border-blue-200 bg-white shadow-xl shadow-blue-100">
                  {/* Search */}
                  <div className="flex items-center gap-2 border-b border-blue-100 px-3 py-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-blue-400">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                    <input
                      autoFocus
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search syndromes…"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                    />
                  </div>
                  {/* Options */}
                  <div className="overflow-y-auto">
                    {filteredOptions.length === 0 ? (
                      <p className="px-4 py-3 text-sm text-slate-400">
                        No matches found
                      </p>
                    ) : (
                      filteredOptions.map((name) => (
                        <button
                          key={name}
                          onClick={() => {
                            setSelected(name);
                            setDropdownOpen(false);
                            setSearch("");
                          }}
                          className="w-full border-b border-slate-50 px-4 py-2.5 text-left text-sm text-slate-700 transition-colors last:border-0 hover:bg-blue-50 hover:text-blue-800"
                        >
                          {name}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              onClick={handleGuess}
              disabled={!selected}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-300 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M4.5 12.5a8 8 0 0 1 8-8h.5" />
                <path d="M12 4.5a8 8 0 0 1 8 8v.5" />
                <circle cx="12" cy="16" r="2" />
                <path d="M12 14v-3" />
              </svg>
              Submit diagnosis
            </button>
          </div>
        )}

        {/* ── Wrong guesses list ─────────────────────────────────────────── */}
        {wrongAttempts.length > 0 && gameState === "playing" && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Incorrect guesses
            </p>
            {wrongAttempts.map((a, i) => (
              <div
                key={i}
                className="mb-2 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-white">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </span>
                <span className="text-sm text-red-800">{a.guess}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Win banner ─────────────────────────────────────────────────── */}
        {gameState === "won" && (
          <div className="mt-4 overflow-hidden rounded-2xl border border-emerald-200 shadow-sm">
            <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
              <span className="text-base font-semibold text-white">
                Correct diagnosis!
              </span>
            </div>
            <div className="bg-emerald-50 px-5 py-4">
              <p className="mb-1 text-base font-semibold text-emerald-900">
                {syndrome.name}
              </p>
              <p className="mb-4 text-sm text-slate-500">
                Solved in {attempts.length} guess
                {attempts.length !== 1 ? "es" : ""} · {cluesRevealed} clue
                {cluesRevealed !== 1 ? "s" : ""} used
                {attempts.length === 1 && (
                  <span className="ml-2 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                    Perfect!
                  </span>
                )}
              </p>
              {wrongAttempts.length > 0 && (
                <div className="mb-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Incorrect guesses
                  </p>
                  {wrongAttempts.map((a, i) => (
                    <div key={i} className="mb-1.5 flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-700">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0">
                        <path d="M18 6 6 18M6 6l12 12" />
                      </svg>
                      {a.guess}
                    </div>
                  ))}
                </div>
              )}
              {syndrome.infoCard && (
                <div className="mt-4 mb-4">
                  <InfoCardComp {...syndrome.infoCard} title={syndrome.name} />
                </div>
              )}
              <button
                onClick={newGame}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95"
              >
                Next case
              </button>
            </div>
          </div>
        )}

        {/* ── Loss banner ────────────────────────────────────────────────── */}
        {gameState === "lost" && (
          <div className="mt-4 overflow-hidden rounded-2xl border border-red-200 shadow-sm">
            <div className="flex items-center gap-3 bg-gradient-to-r from-red-500 to-rose-400 px-5 py-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
              <span className="text-base font-semibold text-white">
                Out of guesses
              </span>
            </div>
            <div className="bg-red-50 px-5 py-4">
              <p className="mb-0.5 text-xs text-slate-400">The answer was:</p>
              <p className="mb-4 text-base font-semibold text-red-800">
                {syndrome.name}
              </p>
              <div className="mb-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Your guesses
                </p>
                {wrongAttempts.map((a, i) => (
                  <div key={i} className="mb-1.5 flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-700">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                    {a.guess}
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {!showAllClues && (
                  <button
                    onClick={() => setShowAllClues(true)}
                    className="flex items-center gap-1.5 rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 active:scale-95"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Reveal all clues
                  </button>
                )}
                <button
                  onClick={newGame}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-400 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                  Try another
                </button>
              </div>
            </div>
          </div>
        )}
          {gameState === "lost" && syndrome.infoCard && (
            <div className="mt-4">
              <InfoCardComp {...syndrome.infoCard} title={syndrome.name} />
            </div>
          )}

        {/* ── Footer ────────────────────────────────────────────────────── */}
        <p className="mt-6 text-center text-xs text-blue-300">
          {SYNDROMES.length} syndromes · cases randomised each session
        </p>
        <LowFotter></LowFotter>
      </div>

      {/* Keyframe for clue slide-in — injected via a style tag */}
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}