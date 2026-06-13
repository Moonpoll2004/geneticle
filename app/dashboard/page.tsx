"use client"

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import { SYNDROMES } from '../game/types'
import { getAttemptedMap } from '../game/cookie'

export default function Dashboard() {
  const [map, setMap] = useState<Record<number, string>>({});

  useEffect(() => {
    try {
      setMap(getAttemptedMap());
    } catch {}
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-blue-900">Cases Dashboard</h1>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-blue-700 hover:underline">Home</Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SYNDROMES.map((s, i) => {
            const status = map[i];
            const base = "block rounded-lg p-4 text-center hover:shadow";
            const classes = status === 'won'
              ? `${base} border border-emerald-200 bg-emerald-50 text-emerald-800`
              : status === 'lost'
              ? `${base} border border-red-200 bg-red-50 text-red-800`
              : `${base} border border-blue-100 bg-white text-blue-800`;

            return (
              <Link key={i} href={`/game?index=${i}`} className={classes}>
                {status ? s.name : `Case ${i + 1}`}
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
