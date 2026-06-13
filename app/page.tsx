import React from 'react'
import Link from 'next/link'
import {SYNDROMES} from './game/types'

export const metadata = {
  title: 'Geneticle — Home',
  description: 'Learn and quiz yourself on genetic syndromes with interactive quizzes and curated content.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white text-slate-900">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center text-white font-semibold">G</div>
          <div>
            <h1 className="text-lg font-semibold text-blue-800">Geneticle</h1>
            <p className="text-xs text-blue-600">Genetic syndromes quiz platform</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-blue-700">
          <Link href="/dashboard" className="px-3 py-2 rounded hover:bg-blue-100">Dashboard</Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-blue-900 leading-tight">Master genetic syndromes with short, focused quizzes</h2>
          <p className="mt-4 text-lg text-blue-700">Interactive quizzes, doctordle-styled content, and progress tracking in dashboard</p>

          <div className="mt-6 flex gap-4">
            <Link href="/game" className="inline-block bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700">Start a Quiz</Link>
            <Link href="/dashboard" className="inline-block border border-blue-200 text-blue-700 px-5 py-3 rounded-lg hover:bg-blue-50">Dashboard</Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-sm text-blue-600 font-medium">Quick sample</div>
          <div className="mt-3">
            <div className="text-sm text-slate-700">Syndrome</div>
              <div className="mt-2 text-xl font-semibold text-blue-800">{SYNDROMES?.[0]?.name ?? 'Sample syndrome'}</div>
              <div className="mt-4 text-sm text-slate-600">{SYNDROMES?.[0]?.initialPrompt?.age ?? ''} • {SYNDROMES?.[0]?.clues?.length ?? 0} clues</div>

              <div className="mt-6 flex gap-3">
                <Link href={`/game`} className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md text-center">Take sample quiz</Link>
              </div>
          </div>
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-blue-900">Platform highlights</h3>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-800">Curated Content</h4>
            <p className="mt-2 text-sm text-blue-700">Reviewed By Medical students: syndromes, summaries and references.</p>
          </div>

          <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-800">Doctordle-Styled</h4>
            <p className="mt-2 text-sm text-blue-700">Questions are designed to mimic the doctordle style of quisioning.</p>
          </div>

          <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-800">Dashboard Tracking</h4>
            <p className="mt-2 text-sm text-blue-700">Through the dashboard link, check the cases.</p>
          </div>
        </div>
      </section>

      {/* Popular quizzes removed per request */}

      <footer id="about" className="mt-12 border-t border-blue-100 bg-blue-50">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-blue-700">© {new Date().getFullYear()} Geneticle — Built for funny education</div>
          <div className="text-sm text-blue-700">Designed By Al-khattab Al-Hinaai</div>
        </div>
      </footer>
    </main>
  )
}
