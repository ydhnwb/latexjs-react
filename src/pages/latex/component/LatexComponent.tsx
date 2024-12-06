import React, { useEffect, useRef, useState } from 'react';

// Import the locally saved LaTeX.js file
import '@/latex.mjs';  // Adjust path if necessary


interface Props {
  expression: string;
  escape?: boolean;
}

const LaTeXComponent = ({ expression, escape }: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const escapeLatexString = (str: string) => {
    const sanitized = str.replace(/\\+/g, (match) => match.repeat(2));
    return sanitized;
  };

  useEffect(() => {
    const loadLatexModule = async () => {
      try {
        // @next/next/no-assign-module-variable
        const module = await import('@/latex.mjs');

        // Define the custom element if not already defined
        if (!customElements.get('latex-js')) {
          customElements.define('latex-js', module.LaTeXJSComponent);
        }

        setIsLoaded(true); // After the module is loaded, update the state
      } catch (error) {
        console.error('Error loading LaTeX module:', error);
      }
    };

    loadLatexModule();
  }, []);

  useEffect(() => {
    if (isLoaded && containerRef.current) {
      // Clear the container
      containerRef.current.innerHTML = '';

      // Create a new latex-js element
      const latexElement = document.createElement('latex-js');
      latexElement.setAttribute(
        'baseURL',
        'https://cdn.jsdelivr.net/npm/latex.js/dist/',
      );

      // Set the content inside the custom element
      latexElement.innerHTML = escape
        ? escapeLatexString(expression)
        : expression;

      // Append the new latex-js element to the container
      containerRef.current.appendChild(latexElement);
    }
  }, [expression, escape, isLoaded]);

  return (
    <div>
      {isLoaded ? (
        // A container div to dynamically manage the custom element
        <div ref={containerRef} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LaTeXComponent;
