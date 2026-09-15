import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

export const Route = createFileRoute("/")({ component: TrilemmaPage });

type OptionId = "pt" | "inteligente" | "honesto";

interface TrilemmaOption {
	id: OptionId;
	code: string;
	title: string;
	description: string;
}

const OPTIONS: TrilemmaOption[] = [
	{
		id: "pt",
		code: "OPT_01",
		title: "Vota no PT",
		description: "Orientação política alinhada ao partido",
	},
	{
		id: "inteligente",
		code: "OPT_02",
		title: "É inteligente",
		description: "Capacidade analítica e cognitiva apurada",
	},
	{
		id: "honesto",
		code: "OPT_03",
		title: "É honesto",
		description: "Conduta moral e integridade comprovada",
	},
];

function getHeadlineParts(selected: OptionId[]) {
	const hasPt = selected.includes("pt");
	const hasInteligente = selected.includes("inteligente");
	const hasHonesto = selected.includes("honesto");

	if (hasPt && hasInteligente) {
		return {
			full: "Vota no PT e é inteligente, mas não é honesto.",
			base: "Vota no PT",
			conjunction: " e ",
			activated: "é inteligente",
			separator: ", mas não ",
			deactivated: "é honesto.",
		};
	}
	if (hasPt && hasHonesto) {
		return {
			full: "Vota no PT e é honesto, mas não é inteligente.",
			base: "Vota no PT",
			conjunction: " e ",
			activated: "é honesto",
			separator: ", mas não ",
			deactivated: "é inteligente.",
		};
	}
	if (hasInteligente && hasHonesto) {
		return {
			full: "É inteligente e é honesto, mas não vota no PT.",
			base: "É inteligente",
			conjunction: " e ",
			activated: "é honesto",
			separator: ", mas não ",
			deactivated: "vota no PT.",
		};
	}
	if (hasPt) {
		return {
			full: "Vota no PT e ...",
			base: "Vota no PT",
			conjunction: " e ",
			activated: "...",
			separator: "",
			deactivated: "",
		};
	}
	if (hasInteligente) {
		return {
			full: "É inteligente e ...",
			base: "É inteligente",
			conjunction: " e ",
			activated: "...",
			separator: "",
			deactivated: "",
		};
	}
	if (hasHonesto) {
		return {
			full: "É honesto e ...",
			base: "É honesto",
			conjunction: " e ",
			activated: "...",
			separator: "",
			deactivated: "",
		};
	}
	return {
		full: "Vota no PT e ...",
		base: "Vota no PT",
		conjunction: " e ",
		activated: "...",
		separator: "",
		deactivated: "",
	};
}

function TrilemmaPage() {
	// Initial state: Option 1 ("pt") is checked, other 2 are unchecked.
	const [selected, setSelected] = useState<OptionId[]>(["pt"]);
	const [copied, setCopied] = useState(false);

	const handleToggle = useCallback((id: OptionId) => {
		setSelected((prev) => {
			if (prev.includes(id)) {
				// Deselect if already active
				return prev.filter((item) => item !== id);
			}

			// If already 2 items are selected, clicking the 3rd deselects the last selected one
			if (prev.length >= 2) {
				return [prev[0], id];
			}

			return [...prev, id];
		});
	}, []);

	const headline = getHeadlineParts(selected);

	const handleCopy = () => {
		if (typeof navigator !== "undefined" && navigator.clipboard) {
			navigator.clipboard.writeText(headline.full);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		}
	};

	const handleReset = () => {
		setSelected(["pt"]);
	};

	return (
		<main className="relative min-h-screen flex flex-col justify-between px-4 py-8 sm:px-8 sm:py-12 md:py-16">
			<div className="cyber-bg" aria-hidden="true" />
			<div className="cyber-grid" aria-hidden="true" />

			{/* Top Bar / Futuristic Telemetry */}
			<header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between border-b border-white/10 pb-4 text-xs tracking-[0.2em] font-mono text-slate-400">
				<div className="flex items-center gap-2">
					<span className="inline-block w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse" />
					<span className="font-semibold text-slate-200 uppercase">
						{"TRILEMA_CORE // v2.6"}
					</span>
				</div>
				<div className="flex items-center gap-4">
					<span className="hidden sm:inline text-slate-500">
						PARÂMETROS: {selected.length}/2
					</span>
					{selected.length === 2 && (
						<span className="text-amber-400/90 font-semibold px-2 py-0.5 rounded border border-amber-400/30 bg-amber-950/40 text-[10px]">
							LIMITE ATINGIDO
						</span>
					)}
					<button
						type="button"
						onClick={handleReset}
						className="hover:text-cyan-300 transition-colors cursor-pointer text-[11px] underline underline-offset-4"
					>
						REINICIAR
					</button>
				</div>
			</header>

			{/* Center Stage: Large Elegant Headline */}
			<section className="relative z-10 w-full max-w-5xl mx-auto my-auto py-12 md:py-20 text-center flex flex-col items-center justify-center">
				<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
					<span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
					Equação Política Quântica
				</div>

				{/* Primary Elegant Large Text */}
				<h1
					className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] transition-all duration-500 font-serif"
					style={{
						fontFamily:
							'"Syne", "Space Grotesk", system-ui, -apple-system, sans-serif',
					}}
				>
					<span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 text-glow">
						{headline.base}
					</span>
					<span className="text-slate-400 font-normal">
						{headline.conjunction}
					</span>
					<span
						className={`transition-all duration-300 ${
							headline.activated === "..."
								? "text-slate-600 animate-pulse"
								: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-200 text-glow-cyan"
						}`}
					>
						{headline.activated}
					</span>
					{headline.separator && (
						<span className="text-slate-400 font-normal">
							{headline.separator}
						</span>
					)}
					{headline.deactivated && (
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400 text-glow-red font-semibold">
							{headline.deactivated}
						</span>
					)}
				</h1>

				{/* Secondary Action: Copy Statement */}
				<div className="mt-8 flex items-center justify-center">
					<button
						type="button"
						onClick={handleCopy}
						className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-slate-900/60 hover:bg-slate-800/80 hover:border-cyan-500/40 text-slate-300 hover:text-white transition-all text-xs font-mono tracking-wider cursor-pointer backdrop-blur-md"
					>
						<svg
							className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
						{copied ? "COPIADO PARA O CLIPBOARD [✓]" : "COPIAR EQUAÇÃO"}
					</button>
				</div>
			</section>

			{/* Bottom Section: 3 Futuristic Select Inputs */}
			<section
				className="relative z-10 w-full max-w-5xl mx-auto"
				aria-label="Seleção de Atributos"
			>
				<div className="flex items-center justify-between mb-4 px-1">
					<p className="text-xs font-mono tracking-[0.2em] text-slate-400 uppercase">
						{"// SELETORES DO SISTEMA [MAX 2]"}
					</p>
					<p className="text-[11px] font-mono text-slate-500">
						Ao selecionar o 3º, o último é desmarcado automaticamente
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
					{OPTIONS.map((option) => {
						const isSelected = selected.includes(option.id);
						const isPt = option.id === "pt";

						return (
							<button
								key={option.id}
								type="button"
								aria-pressed={isSelected}
								onClick={() => handleToggle(option.id)}
								className={`cyber-card cursor-pointer p-6 flex flex-col justify-between text-left select-none relative overflow-hidden group transition-all duration-300 w-full ${
									isSelected
										? isPt
											? "card-glow-pt border-red-500/50 bg-gradient-to-b from-red-950/30 via-slate-900/80 to-slate-950/90"
											: "card-glow-active border-cyan-400/50 bg-gradient-to-b from-cyan-950/30 via-slate-900/80 to-slate-950/90"
										: "bg-slate-950/40 border-white/10 hover:border-white/20"
								}`}
							>
								{/* Subtle scanline on active card */}
								{isSelected && <div className="cyber-scanline" />}

								<div>
									{/* Top Meta: Code & Status */}
									<div className="flex items-center justify-between mb-4">
										<span className="text-[11px] font-mono tracking-widest text-slate-500 group-hover:text-slate-400 transition-colors">
											{option.code}
										</span>
										<span
											className={`text-[10px] font-mono tracking-widest uppercase flex items-center gap-1.5 px-2 py-0.5 rounded-full border transition-all ${
												isSelected
													? isPt
														? "border-red-500/40 bg-red-950/50 text-red-300"
														: "border-cyan-400/40 bg-cyan-950/50 text-cyan-300"
													: "border-white/5 bg-white/5 text-slate-500"
											}`}
										>
											<span
												className={`w-1.5 h-1.5 rounded-full ${
													isSelected
														? isPt
															? "bg-red-400 animate-pulse shadow-[0_0_6px_#ef4444]"
															: "bg-cyan-400 animate-pulse shadow-[0_0_6px_#06b6d4]"
														: "bg-slate-600"
												}`}
											/>
											{isSelected ? "ATIVO" : "DESMARCADO"}
										</span>
									</div>

									{/* Main Title */}
									<h2
										className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 transition-colors ${
											isSelected
												? "text-white"
												: "text-slate-300 group-hover:text-slate-100"
										}`}
									>
										{option.title}
									</h2>

									{/* Description */}
									<p className="text-xs text-slate-400 leading-relaxed font-sans">
										{option.description}
									</p>
								</div>

								{/* Bottom Interactive Cyber Toggle Switch */}
								<div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
									<span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
										ESTADO DO PARÂMETRO
									</span>

									{/* Custom Futuristic Switch */}
									<div
										className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center ${
											isSelected
												? isPt
													? "bg-red-600/80 shadow-[0_0_12px_rgba(239,68,68,0.5)]"
													: "bg-cyan-500/80 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
												: "bg-slate-800 border border-white/10"
										}`}
									>
										<div
											className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-md ${
												isSelected ? "translate-x-6" : "translate-x-0"
											}`}
										/>
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</section>

			{/* Footer Telemetry */}
			<footer className="relative z-10 w-full max-w-5xl mx-auto mt-12 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-slate-600">
				<span>{"SISTEMA DE ANÁLISE POLÍTICA // MOTOR SSR TANSTACK START"}</span>
				<span>HTML PRONTO PARA INDEXAÇÃO SEO</span>
			</footer>
		</main>
	);
}
