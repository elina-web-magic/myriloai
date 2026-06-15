'use client'

import { Activity, Brain, Check, Copy, Database, ListChecks, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import data from '../data/output.json'

type OutputData = {
	output: string
	test_case: {
		scenario: string
		prompt_inputs: Record<string, string>
		solution_criteria: string[]
		task_description?: string
	}
	total_score: number
	scores: Record<string, number>
	reasoning: string
	strengths: string[]
	weaknesses: string[]
}

const reportData = data as OutputData[]

const totalTests = reportData.length
const averageScore =
	totalTests > 0
		? (reportData.reduce((acc, curr) => acc + curr.total_score, 0) / totalTests).toFixed(1)
		: 0
const passRate =
	totalTests > 0
		? ((reportData.filter((d) => d.total_score >= 30).length / totalTests) * 100).toFixed(1)
		: 0

function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false)

	const handleCopy = () => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		})
	}

	return (
		<button
			type="button"
			onClick={handleCopy}
			className="absolute top-2 right-2 p-2 transition-colors rounded-[var(--r-md)] bg-[var(--surface-2)] border border-[var(--line)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]"
			title="Copy to clipboard"
			aria-label="Copy to clipboard"
		>
			{copied ? (
				<Check size={16} className="text-[var(--success)]" />
			) : (
				<Copy size={16} className="text-[var(--ink-2)]" />
			)}
		</button>
	)
}

const getScoreColor = (score: number): string => {
	if (score >= 35) return 'text-[var(--success)] border-[var(--success)] bg-[var(--success-soft)]'
	if (score >= 25) return 'text-[var(--warning)] border-[var(--warning)] bg-[var(--warning-soft)]'
	return 'text-[var(--error)] border-[var(--error)] bg-[var(--error-soft)]'
}

function ScenarioCard({ row, index }: { row: OutputData; index: number }) {
	const [activeTab, setActiveTab] = useState<'reasoning' | 'output'>('reasoning')

	return (
		<div className="card overflow-hidden flex flex-col group">
			{/* Card Header */}
			<div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--line)] bg-[var(--surface)]">
				<div>
					<h3 className={`t-h3 ${index % 2 === 0 ? 'text-gradient-1' : 'text-gradient-2'}`}>
						{row.test_case.scenario}
					</h3>
					<div className="flex flex-wrap gap-2 mt-2">
						{Object.entries(row.test_case.prompt_inputs).map(([key, val]) => (
							<span
								key={key}
								className="t-small transition-colors font-mono px-2.5 py-1 rounded-[var(--r-sm)] bg-[var(--info-soft)] text-[var(--info)] border border-[var(--line)]"
							>
								{key}: {val}
							</span>
						))}
					</div>
				</div>

				<div
					className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-nowrap ${getScoreColor(row.total_score)}`}
				>
					<span className="font-bold text-xl">{row.total_score}</span>
					<span className="t-small opacity-70">/ 40</span>
				</div>
			</div>

			{/* Card Body */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x border-[var(--line)]">
				{/* Column 1: Criteria & Breakdown */}
				<div className="p-6 flex flex-col gap-6">
					<div>
						<h4 className="meta mb-3 flex items-center gap-2">
							<ListChecks size={16} /> Criteria
						</h4>
						<ul className="checklist">
							{row.test_case.solution_criteria.map((criteria) => (
								<li key={criteria}>{criteria}</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="meta mb-3">Score Breakdown</h4>
						<div className="grid grid-cols-2 gap-3">
							{Object.entries(row.scores).map(([metric, score]) => {
								const textColor =
									score >= 8
										? 'text-[var(--success)]'
										: score >= 5
											? 'text-[var(--warning)]'
											: 'text-[var(--error)]'
								const bgColor =
									score >= 8
										? 'bg-[var(--success)]'
										: score >= 5
											? 'bg-[var(--warning)]'
											: 'bg-[var(--error)]'

								return (
									<div
										key={metric}
										className="cell flex flex-col p-3 transition-colors gap-2 bg-[var(--surface)]"
									>
										<div className="flex justify-between items-center">
											<span className="t-small truncate" title={metric}>
												{metric.replace(/_/g, ' ')}
											</span>
											<span className={`font-mono font-bold text-sm ${textColor}`}>{score}/10</span>
										</div>
										<div className="w-full h-1 rounded-full overflow-hidden bg-[var(--surface-2)]">
											<div
												className={`h-full ${bgColor}`}
												style={{ width: `${(score / 10) * 100}%` }}
											></div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>

				<div className="p-6 flex flex-col gap-4 bg-[var(--surface-2)]">
					<div className="flex border-b border-[var(--line)]">
						<button
							type="button"
							onClick={() => setActiveTab('reasoning')}
							className="px-4 py-2 t-h6 transition-colors border-b-2"
							style={{
								borderColor: activeTab === 'reasoning' ? 'var(--accent)' : 'transparent',
								color: activeTab === 'reasoning' ? 'var(--accent)' : 'var(--ink-2)',
							}}
						>
							<span className="flex items-center gap-2">
								<Brain size={16} /> Reasoning
							</span>
						</button>
						<button
							type="button"
							onClick={() => setActiveTab('output')}
							className="px-4 py-2 t-h6 transition-colors border-b-2"
							style={{
								borderColor: activeTab === 'output' ? 'var(--info)' : 'transparent',
								color: activeTab === 'output' ? 'var(--info)' : 'var(--ink-2)',
							}}
						>
							<span className="flex items-center gap-2">
								<Database size={16} /> Raw Output
							</span>
						</button>
					</div>

					<div className="flex-1 relative h-[320px]">
						{activeTab === 'reasoning' && (
							<div className="absolute inset-0 overflow-auto custom-scrollbar pr-2 t-body leading-relaxed">
								{row.reasoning}
							</div>
						)}
						{activeTab === 'output' && (
							<div
								className="cell absolute inset-0 overflow-hidden"
								style={{ background: 'var(--surface)' }}
							>
								<CopyButton text={row.output} />
								<div className="absolute inset-0 overflow-auto p-4 custom-scrollbar">
									<pre className="t-small font-mono whitespace-pre-wrap break-words">
										{row.output}
									</pre>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default function Home() {
	const { resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setMounted(true), 0)
		return () => clearTimeout(timer)
	}, [])

	return (
		<main className="min-h-screen p-6 md:p-12 lg:p-24 max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
			{/* Header */}
			<header className="card flex flex-col md:flex-row justify-between items-center gap-6 p-8">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-3">
						<div className="avatar flex items-center justify-center shadow-lg w-12 h-12 bg-[var(--surface-2)] text-[var(--ink)]">
							<Database size={24} />
						</div>
						<h1 className="t-h1 text-gradient-1">Myrilo AI</h1>
					</div>
					<p className="lead">Your Agentic LLM Evaluation Platform</p>
				</div>

				<button
					type="button"
					onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
					className="card flex items-center justify-center cursor-pointer transition-colors hover-surface rounded-full w-12 h-12"
					aria-label="Toggle theme"
				>
					{mounted ? (
						resolvedTheme === 'dark' ? (
							<Sun size={20} className="text-[var(--warning)]" />
						) : (
							<Moon size={20} className="text-[var(--accent)]" />
						)
					) : (
						<div className="w-5 h-5" />
					)}
				</button>
			</header>

			{/* Stats Cards */}
			<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="card p-6 flex items-center gap-4 transition-transform hover:-translate-y-1">
					<div
						className="avatar flex items-center justify-center"
						style={{
							width: '56px',
							height: '56px',
							background: 'var(--surface-2)',
							color: 'var(--accent)',
						}}
					>
						<ListChecks size={28} />
					</div>
					<div>
						<p className="meta mb-1">Total Test Cases</p>
						<p className="t-h2 font-mono">{totalTests}</p>
					</div>
				</div>
				<div className="card p-6 flex items-center gap-4 transition-transform hover:-translate-y-1">
					<div
						className="avatar flex items-center justify-center"
						style={{
							width: '56px',
							height: '56px',
							background: 'var(--surface-2)',
							color: 'var(--success)',
						}}
					>
						<Activity size={28} />
					</div>
					<div>
						<p className="meta mb-1">Average Score</p>
						<p className="t-h2 font-mono">
							{averageScore}{' '}
							<span className="t-h4" style={{ color: 'var(--ink-3)' }}>
								/ 40
							</span>
						</p>
					</div>
				</div>
				<div className="card p-6 flex items-center gap-4 transition-transform hover:-translate-y-1">
					<div
						className="avatar flex items-center justify-center"
						style={{
							width: '56px',
							height: '56px',
							background: 'var(--surface-2)',
							color: 'var(--warning)',
						}}
					>
						<Brain size={28} />
					</div>
					<div>
						<p className="meta mb-1">Pass Rate (&ge;30)</p>
						<p className="t-h2 font-mono">{passRate}%</p>
					</div>
				</div>
			</section>

			{/* Results Grid */}
			<section className="flex flex-col gap-8 mt-4">
				<h2 className="t-h2 flex items-center gap-3">
					<Activity size={32} style={{ color: 'var(--accent)' }} />
					Evaluation Results
				</h2>

				<div className="grid grid-cols-1 gap-12">
					{reportData.map((row, index) => (
						<ScenarioCard key={row.test_case.scenario} row={row} index={index} />
					))}
				</div>
			</section>
		</main>
	)
}
