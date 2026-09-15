import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Teste de Voto PT — O Trilema",
			},
			{
				name: "description",
				content:
					"Teste interativo e futurista do trilema: Vota no PT, é inteligente, é honesto. Selecione até duas opções simultaneamente.",
			},
			{
				name: "theme-color",
				content: "#030712",
			},
			{
				property: "og:title",
				content: "Teste de Voto PT — O Trilema",
			},
			{
				property: "og:description",
				content:
					"Vota no PT, é inteligente, é honesto. Descubra a combinação neste seletor futurista.",
			},
			{
				property: "og:type",
				content: "website",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="pt-BR" className="dark">
			<head>
				<HeadContent />
			</head>
			<body className="font-sans antialiased bg-[#030712] text-slate-100 min-h-screen overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
