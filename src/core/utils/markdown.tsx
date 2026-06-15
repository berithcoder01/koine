import React from 'react';

/**
 * Renderiza um texto contendo marcações de Markdown básicas (**negrito** e *itálico*)
 * em elementos JSX React seguros, sem necessitar de dependências externas.
 * 
 * @param text O texto que contém as marcações.
 */
export function renderMarkdown(text: string | undefined): React.ReactNode {
  if (!text) return null;

  // Separa o texto com base em delimitadores de negrito (**) e itálico (*)
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        // Verifica se é negrito: **texto**
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className="font-extrabold text-text-primary dark:text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        // Verifica se é itálico: *texto*
        if (part.startsWith('*') && part.endsWith('*')) {
          return (
            <em key={index} className="italic text-text-primary dark:text-zinc-200">
              {part.slice(1, -1)}
            </em>
          );
        }
        // Texto normal
        return part;
      })}
    </>
  );
}
