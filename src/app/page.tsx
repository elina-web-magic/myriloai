'use client'

import { Activity, Brain, Check, Copy, Database, ListChecks, Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import data from '../data/output.json'
import logoSvg from './myrilo-ai-logo.svg'

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
			className="copy-btn absolute top-2 right-2 p-2 transition-colors rounded-[var(--r-md)] bg-[var(--surface-2)] border border-[var(--line)] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]"
			title="Copy to clipboard"
			aria-label="Copy to clipboard"
		>
			{copied ? (
				<Check size={16} className="copy-btn__icon copy-btn__icon--success text-[var(--success)]" />
			) : (
				<Copy size={16} className="copy-btn__icon copy-btn__icon--idle text-[var(--ink-2)]" />
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
		<div className="scenario-card card overflow-hidden flex flex-col group">
			{/* Card Header */}
			<div className="scenario-card__header p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[var(--line)] bg-[var(--surface)]">
				<div className="scenario-card__header-info">
					<h3
						className={`scenario-card__title t-h3 ${index % 2 === 0 ? 'text-gradient-1' : 'text-gradient-2'}`}
					>
						{row.test_case.scenario}
					</h3>
					<div className="scenario-card__inputs flex flex-wrap gap-2 mt-2">
						{Object.entries(row.test_case.prompt_inputs).map(([key, val]) => (
							<span
								key={key}
								className="scenario-card__input-badge t-small transition-colors font-mono px-2.5 py-1 rounded-[var(--r-sm)] bg-[var(--info-soft)] text-[var(--info)] border border-[var(--line)]"
							>
								{key}: {val}
							</span>
						))}
					</div>
				</div>

				<div
					className={`scenario-card__score flex items-center gap-2 px-4 py-2 rounded-xl border text-nowrap ${getScoreColor(row.total_score)}`}
				>
					<span className="scenario-card__score-value font-bold text-xl">{row.total_score}</span>
					<span className="scenario-card__score-max t-small opacity-70">/ 40</span>
				</div>
			</div>

			{/* Card Body */}
			<div className="scenario-card__body grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x border-[var(--line)]">
				{/* Column 1: Criteria & Breakdown */}
				<div className="scenario-card__column scenario-card__column--metrics p-6 flex flex-col gap-6">
					<div className="scenario-card__criteria-section">
						<h4 className="scenario-card__criteria-title meta mb-3 flex items-center gap-2">
							<ListChecks size={16} /> Criteria
						</h4>
						<ul className="scenario-card__criteria-list checklist">
							{row.test_case.solution_criteria.map((criteria) => (
								<li key={criteria} className="scenario-card__criteria-item">
									{criteria}
								</li>
							))}
						</ul>
					</div>

					<div className="scenario-card__breakdown-section">
						<h4 className="scenario-card__breakdown-title meta mb-3">Score Breakdown</h4>
						<div className="scenario-card__breakdown-grid grid grid-cols-2 gap-3">
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
										className="scenario-card__breakdown-cell cell flex flex-col p-3 transition-colors gap-2 bg-[var(--surface)]"
									>
										<div className="scenario-card__breakdown-header flex justify-between items-center">
											<span
												className="scenario-card__breakdown-metric t-small truncate"
												title={metric}
											>
												{metric.replace(/_/g, ' ')}
											</span>
											<span
												className={`scenario-card__breakdown-value font-mono font-bold text-sm ${textColor}`}
											>
												{score}/10
											</span>
										</div>
										<div className="scenario-card__breakdown-bar-wrapper w-full h-1 rounded-full overflow-hidden bg-[var(--surface-2)]">
											<div
												className={`scenario-card__breakdown-bar-fill h-full ${bgColor}`}
												style={{ width: `${(score / 10) * 100}%` }}
											></div>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>

				<div className="scenario-card__column scenario-card__column--content p-6 flex flex-col gap-4 bg-[var(--surface-2)]">
					<div className="scenario-card__tabs flex border-b border-[var(--line)]">
						<button
							type="button"
							onClick={() => setActiveTab('reasoning')}
							className="scenario-card__tab scenario-card__tab--reasoning px-4 py-2 t-h6 transition-colors border-b-2"
							style={{
								borderColor: activeTab === 'reasoning' ? 'var(--accent)' : 'transparent',
								color: activeTab === 'reasoning' ? 'var(--accent)' : 'var(--ink-2)',
							}}
						>
							<span className="scenario-card__tab-inner flex items-center gap-2">
								<Brain size={16} /> Reasoning
							</span>
						</button>
						<button
							type="button"
							onClick={() => setActiveTab('output')}
							className="scenario-card__tab scenario-card__tab--output px-4 py-2 t-h6 transition-colors border-b-2"
							style={{
								borderColor: activeTab === 'output' ? 'var(--info)' : 'transparent',
								color: activeTab === 'output' ? 'var(--info)' : 'var(--ink-2)',
							}}
						>
							<span className="scenario-card__tab-inner flex items-center gap-2">
								<Database size={16} /> Raw Output
							</span>
						</button>
					</div>

					<div className="scenario-card__content flex-1 relative h-[320px]">
						{activeTab === 'reasoning' && (
							<div className="scenario-card__reasoning absolute inset-0 overflow-auto custom-scrollbar pr-2 t-body leading-relaxed">
								{row.reasoning}
							</div>
						)}
						{activeTab === 'output' && (
							<div
								className="scenario-card__raw-output cell absolute inset-0 overflow-hidden"
								style={{ background: 'var(--surface)' }}
							>
								<CopyButton text={row.output} />
								<div className="scenario-card__output-scroll absolute inset-0 overflow-auto p-4 custom-scrollbar">
									<pre className="scenario-card__output-text t-small font-mono whitespace-pre-wrap break-words">
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
		<main className="app min-h-screen p-6 md:p-12 lg:p-24 max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
			{/* Header */}
			<header className="app__header card flex flex-col md:flex-row justify-between items-center gap-6 p-8">
				<div className="app__title-group flex flex-col gap-2">
					<div className="app__logo-wrapper flex items-center gap-3">
						<div className="app__logo-icon flex items-center justify-center">
							<Image src={logoSvg} alt="Myrilo AI Logo" width={48} height={48} />
						</div>
						<h1 className="app__logo-text t-h1 text-gradient-1">Myrilo AI</h1>
					</div>
					<p className="app__tagline lead">Your Agentic LLM Evaluation Platform</p>
				</div>

				<button
					type="button"
					onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
					className="app__theme-toggle card flex items-center justify-center cursor-pointer transition-colors hover-surface rounded-full w-12 h-12"
					aria-label="Toggle theme"
				>
					{mounted ? (
						resolvedTheme === 'dark' ? (
							<Sun
								size={20}
								className="app__theme-icon app__theme-icon--light text-[var(--warning)]"
							/>
						) : (
							<Moon
								size={20}
								className="app__theme-icon app__theme-icon--dark text-[var(--accent)]"
							/>
						)
					) : (
						<div className="app__theme-placeholder w-5 h-5" />
					)}
				</button>
			</header>

			{/* Stats Cards */}
			<section className="app__stats grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="stat-card card p-6 flex items-center gap-4 transition-transform hover:-translate-y-1">
					<div
						className="stat-card__avatar avatar flex items-center justify-center"
						style={{
							width: '56px',
							height: '56px',
							background: 'var(--surface-2)',
							color: 'var(--accent)',
						}}
					>
						<ListChecks size={28} />
					</div>
					<div className="stat-card__content">
						<p className="stat-card__label meta mb-1">Total Test Cases</p>
						<p className="stat-card__value t-h2 font-mono">{totalTests}</p>
					</div>
				</div>
				<div className="stat-card card p-6 flex items-center gap-4 transition-transform hover:-translate-y-1">
					<div
						className="stat-card__avatar avatar flex items-center justify-center"
						style={{
							width: '56px',
							height: '56px',
							background: 'var(--surface-2)',
							color: 'var(--success)',
						}}
					>
						<Activity size={28} />
					</div>
					<div className="stat-card__content">
						<p className="stat-card__label meta mb-1">Average Score</p>
						<p className="stat-card__value t-h2 font-mono">
							{averageScore}{' '}
							<span className="stat-card__value-max t-h4" style={{ color: 'var(--ink-3)' }}>
								/ 40
							</span>
						</p>
					</div>
				</div>
				<div className="stat-card card p-6 flex items-center gap-4 transition-transform hover:-translate-y-1">
					<div
						className="stat-card__avatar avatar flex items-center justify-center"
						style={{
							width: '56px',
							height: '56px',
							background: 'var(--surface-2)',
							color: 'var(--warning)',
						}}
					>
						<Brain size={28} />
					</div>
					<div className="stat-card__content">
						<p className="stat-card__label meta mb-1">Pass Rate (&ge;30)</p>
						<p className="stat-card__value t-h2 font-mono">{passRate}%</p>
					</div>
				</div>
			</section>

			{/* Results Grid */}
			<section className="app__results flex flex-col gap-8 mt-4">
				<h2 className="app__results-title t-h2 flex items-center gap-3">
					<Activity size={32} style={{ color: 'var(--accent)' }} />
					Evaluation Results
				</h2>

				<div className="app__results-grid grid grid-cols-1 gap-12">
					{reportData.map((row, index) => (
						<ScenarioCard key={row.test_case.scenario} row={row} index={index} />
					))}
				</div>
			</section>
		</main>
	)
}
