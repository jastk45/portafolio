import { defineConfig } from 'astro/config';
import rehypeMermaid from 'rehype-mermaid';

// https://astro.build/config
export default defineConfig({
    markdown: {
        syntaxHighlight: {
            type: 'shiki',
            excludeLangs: ['mermaid'],
        },
        shikiConfig: {
            theme: 'min-light',
            wrap: true,
        },
        rehypePlugins: [
            [
                rehypeMermaid,
                {
                    strategy: 'inline-svg',
                    mermaidConfig: {
                        theme: 'neutral',
                        themeVariables: {
                            fontFamily: 'Hanken Grotesk, system-ui, sans-serif',
                            fontSize: '18px',
                        },
                        flowchart: {
                            padding: 24,
                            nodeSpacing: 70,
                            rankSpacing: 120,
                            curve: 'basis',
                            useMaxWidth: false,
                            htmlLabels: true,
                            wrappingWidth: 240,
                            diagramPadding: 32,
                        },
                    },
                },
            ],
        ],
    },
});
