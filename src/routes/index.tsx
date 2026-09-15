import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";

export const Route = createFileRoute("/")({ component: TrilemmaPage });

type OptionId = "pt" | "inteligente" | "honesto";

interface TrilemmaOption {
	id: OptionId;
	title: string;
}

const OPTIONS: TrilemmaOption[] = [
	{
		id: "pt",
		title: "Vota no PT",
	},
	{
		id: "inteligente",
		title: "É inteligente",
	},
	{
		id: "honesto",
		title: "É honesto",
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

	return (
		<main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 sm:px-8">
			<div className="cyber-bg" aria-hidden="true" />
			<div className="cyber-grid" aria-hidden="true" />

			{/* Center Stage: Large Elegant Headline */}
			<section className="relative z-10 w-full max-w-5xl mx-auto text-center mb-12 md:mb-20">
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
			</section>

			{/* Bottom Section: 3 Futuristic Select Inputs */}
			<section
				className="relative z-10 w-full max-w-5xl mx-auto"
				aria-label="Seleção de Atributos"
			>
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
								className={`cyber-card cursor-pointer p-6 flex items-center justify-between text-left select-none relative overflow-hidden group transition-all duration-300 w-full ${
									isSelected
										? isPt
											? "card-glow-pt border-red-500/50 bg-gradient-to-b from-red-950/30 via-slate-900/80 to-slate-950/90"
											: "card-glow-active border-cyan-400/50 bg-gradient-to-b from-cyan-950/30 via-slate-900/80 to-slate-950/90"
										: "bg-slate-950/40 border-white/10 hover:border-white/20"
								}`}
							>
								{/* Subtle scanline on active card */}
								{isSelected && <div className="cyber-scanline" />}

								{/* Main Title */}
								<span
									className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors ${
										isSelected
											? "text-white"
											: "text-slate-300 group-hover:text-slate-100"
									}`}
								>
									{option.title}
								</span>

								{/* Estado (Futuristic Switch) */}
								<div
									className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center shrink-0 ml-4 ${
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
							</button>
						);
					})}
				</div>
			</section>
		</main>
	);
}
