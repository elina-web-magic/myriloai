"use client";

import {
	Activity,
	Brain,
	Check,
	Copy,
	Database,
	ListChecks,
	Moon,
	Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import data from "../data/output.json";

type OutputData = {
	output: string;
	test_case: {
		scenario: string;
		prompt_inputs: Record<string, string>;
		solution_criteria: string[];
		task_description?: string;
	};
	total_score: number;
	scores: Record<string, number>;
	reasoning: string;
	strengths: string[];
	weaknesses: string[];
};

const reportData = data as OutputData[];

const totalTests = reportData.length;
const averageScore =
	totalTests > 0
		? (
				reportData.reduce((acc, curr) => acc + curr.total_score, 0) / totalTests
			).toFixed(1)
		: 0;
const passRate =
	totalTests > 0
		? (
				(reportData.filter((d) => d.total_score >= 30).length / totalTests) *
				100
			).toFixed(1)
		: 0;

function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = () => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	return (
		<button
			type="button"
			onClick={handleCopy}
			className="absolute top-2 right-2 p-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 transition-colors backdrop-blur-md"
			title="Copy to clipboard"
			aria-label="Copy to clipboard"
		>
			{copied ? (
				<Check size={16} className="text-emerald-500" />
			) : (
				<Copy size={16} className="text-slate-300" />
			)}
		</button>
	);
}

const getScoreColor = (score: number) => {
	if (score >= 35)
		return "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
	if (score >= 25) return "text-gold-400 border-gold-500/30 bg-gold-500/10";
	return "text-red-400 border-red-500/30 bg-red-500/10";
};

function ScenarioCard({ row }: { row: OutputData }) {
	const [activeTab, setActiveTab] = useState<"reasoning" | "output">(
		"reasoning",
	);

	return (
		<div className="glass-panel-interactive overflow-hidden flex flex-col group">
			{/* Card Header */}
			<div className="bg-white/5 border-b border-white/5 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
				<div>
					<h3 className="text-xl font-bold text-white">
						{row.test_case.scenario}
					</h3>
					<div className="flex flex-wrap gap-2 mt-2">
						{Object.entries(row.test_case.prompt_inputs).map(([key, val]) => (
							<span
								key={key}
								className="text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 transition-colors group-hover:border-cyan-400/40"
							>
								{key}: {val}
							</span>
						))}
					</div>
				</div>

				<div
					className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${getScoreColor(row.total_score)}`}
				>
					<span className="font-bold text-xl">{row.total_score}</span>
					<span className="text-sm opacity-70">/ 40</span>
				</div>
			</div>

			{/* Card Body */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
				{/* Column 1: Criteria & Breakdown */}
				<div className="p-6 flex flex-col gap-6">
					<div>
						<h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
							<ListChecks size={16} /> Criteria
						</h4>
						<ul className="space-y-2 text-sm text-slate-100">
							{row.test_case.solution_criteria.map((criteria) => (
								<li key={criteria} className="flex gap-2">
									<span className="text-emerald-400 mt-0.5">•</span>
									<span>{criteria}</span>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-3">
							Score Breakdown
						</h4>
						<div className="grid grid-cols-2 gap-3">
							{Object.entries(row.scores).map(([metric, score]) => {
								const isHigh = score >= 8;
								const isMid = score >= 5 && score < 8;
								const scoreColor = isHigh
									? "text-emerald-400"
									: isMid
										? "text-gold-400"
										: "text-red-400";
								const barColor = isHigh
									? "bg-emerald-400"
									: isMid
										? "bg-gold-400"
										: "bg-red-400";

								return (
									<div
										key={metric}
										className="flex flex-col p-3 rounded-lg bg-white/5 border border-white/10 transition-colors group-hover:bg-white/10 gap-2"
									>
										<div className="flex justify-between items-center">
											<span
												className="text-xs text-slate-200 truncate"
												title={metric}
											>
												{metric.replace(/_/g, " ")}
											</span>
											<span
												className={`font-mono font-bold text-sm ${scoreColor}`}
											>
												{score}/10
											</span>
										</div>
										<div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
											<div
												className={`h-full ${barColor}`}
												style={{ width: `${(score / 10) * 100}%` }}
											></div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Column 2: Tabs (Reasoning / Output) */}
				<div className="p-6 flex flex-col gap-4 bg-black/5 dark:bg-black/20">
					<div className="flex border-b border-white/10">
						<button
							type="button"
							onClick={() => setActiveTab("reasoning")}
							className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
								activeTab === "reasoning"
									? "border-violet-500 text-violet-400"
									: "border-transparent text-slate-400 hover:text-slate-300"
							}`}
						>
							<span className="flex items-center gap-2">
								<Brain size={16} /> Reasoning
							</span>
						</button>
						<button
							type="button"
							onClick={() => setActiveTab("output")}
							className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
								activeTab === "output"
									? "border-cyan-500 text-cyan-400"
									: "border-transparent text-slate-400 hover:text-slate-300"
							}`}
						>
							<span className="flex items-center gap-2">
								<Database size={16} /> Raw Output
							</span>
						</button>
					</div>

					<div className="flex-1 relative h-[320px]">
						{activeTab === "reasoning" && (
							<div className="absolute inset-0 overflow-auto custom-scrollbar pr-2 text-sm text-slate-200 leading-relaxed">
								{row.reasoning}
							</div>
						)}
						{activeTab === "output" && (
							<div className="absolute inset-0 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
								<CopyButton text={row.output} />
								<div className="absolute inset-0 overflow-auto p-4 custom-scrollbar">
									<pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap break-words">
										{row.output}
									</pre>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Home() {
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<main className="min-h-screen p-6 md:p-12 lg:p-24 max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
			{/* Header */}
			<header className="flex flex-col md:flex-row justify-between items-center gap-6 glass-panel p-8">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-3">
						<div className="p-3 rounded-xl bg-gradient-to-br from-cyan-mint to-sky text-white shadow-lg">
							<Database size={24} />
						</div>
						<h1 className="text-4xl font-bold tracking-tight">
							<span className="text-gradient">Myrilo AI</span>
						</h1>
					</div>
					<p className="text-slate-300">Your Agentic LLM Evaluation Platform</p>
				</div>

				<button
					type="button"
					onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
					className="flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel-interactive border border-white/10 hover:border-violet-500/50"
					aria-label="Toggle theme"
				>
					<Sun size={18} className="hidden dark:block text-gold-400" />
					<Moon size={18} className="block dark:hidden text-violet-500" />
					<span className="font-medium text-sm hidden dark:block text-slate-200">
						Light Mode
					</span>
					<span className="font-medium text-sm block dark:hidden text-slate-800">
						Dark Mode
					</span>
				</button>
			</header>

			{/* Stats Cards */}
			<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="glass-panel-interactive p-6 flex items-center gap-4">
					<div className="p-4 rounded-full bg-violet-500/20 text-violet-400">
						<ListChecks size={28} />
					</div>
					<div>
						<p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
							Total Test Cases
						</p>
						<p className="text-3xl font-mono font-bold text-white">
							{totalTests}
						</p>
					</div>
				</div>
				<div className="glass-panel-interactive p-6 flex items-center gap-4">
					<div className="p-4 rounded-full bg-emerald-500/20 text-emerald-400">
						<Activity size={28} />
					</div>
					<div>
						<p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
							Average Score
						</p>
						<p className="text-3xl font-mono font-bold text-white">
							{averageScore}{" "}
							<span className="text-lg text-slate-400">/ 40</span>
						</p>
					</div>
				</div>
				<div className="glass-panel-interactive p-6 flex items-center gap-4">
					<div className="p-4 rounded-full bg-gold-500/20 text-gold-400">
						<Brain size={28} />
					</div>
					<div>
						<p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
							Pass Rate (&ge;30)
						</p>
						<p className="text-3xl font-mono font-bold text-white">
							{passRate}%
						</p>
					</div>
				</div>
			</section>

			{/* Results Grid */}
			<section className="flex flex-col gap-8 mt-4">
				<h2 className="text-2xl font-bold flex items-center gap-2 text-white">
					<Activity className="text-violet-500" />
					Evaluation Results
				</h2>

				<div className="grid grid-cols-1 gap-12">
					{reportData.map((row) => (
						<ScenarioCard key={row.test_case.scenario} row={row} />
					))}
				</div>
			</section>
		</main>
	);
}
