import React, { useEffect, useRef, useState } from 'react';


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
        const latexModule = await import('@/latex.mjs');

        // Define the custom element if not already defined
        if (!customElements.get('latex-js')) {
          customElements.define('latex-js', latexModule.LaTeXJSComponent);
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
        'https://cdn.jsdelivr.net/npm/latex.js/dist/css',
      );

      // Set the content inside the custom element
      latexElement.innerHTML = escape
        ? escapeLatexString(expression)
        : expression;

      // Append the new latex-js element to the container
      containerRef.current.appendChild(latexElement);
    }
  }, [expression, escape, isLoaded]);


  //enable this if want some customized
  // useEffect(() => {
  //   if (isLoaded && containerRef.current) {
  //     const latexElement = containerRef.current.querySelector('latex-js')
  //     if (latexElement && latexElement.shadowRoot) {
  //       // Use setTimeout to ensure the shadow DOM is fully rendered
  //       setTimeout(() => {
  //         const shadowRoot = latexElement.shadowRoot

  //         // Create a <style> element to inject custom CSS into the shadow DOM
  //         const style = document.createElement('style')
  //         style.textContent = `
  //           /* Load OpenSans font from Google Fonts */
  //           @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

  //           /* Apply OpenSans font and spacing to headers */
  //           h2, h3 {
  //             font-family: 'Open Sans', sans-serif !important;
  //             font-weight: 600;
  //           }

  //           /* Preserve consistent styles for the page content */
  //           .page, .body {
  //             font-family: 'Open Sans', sans-serif !important;
  //             font-size: ${useLargeScreenView ? '1.1em' : '1em'};
  //             overflow-x: hidden; /* Prevent horizontal scrolling for the whole page */

  //           }


  //           /* Target KaTeX display formulas to enable horizontal scrolling */
  //           .katex-display {
  //             overflow-x: auto; /* Allow horizontal scroll for formulas */
  //             -webkit-overflow-scrolling: touch; /* Smooth scrolling on mobile */
  //             padding-top: 24px !important;
  //             padding-bottom: 24px !important;
  //             white-space: nowrap; /* Prevent wrapping */
  //             text-align: center; /* Keep the text centered */
  //           }

  //           /* Optional: Ensure inline formulas also respect horizontal constraints */
  //           .katex {
  //             display: inline-block; /* Constrain formulas to their natural width */
  //             max-width: 100%; /* Prevent overflow */
  //           }

  //           /* Optional: Style horizontal scrollbars for formulas */
  //           .katex-display::-webkit-scrollbar {
  //             height: 0px;
  //             width: 0px;
  //           }
  //           .katex-display::-webkit-scrollbar-thumb {
  //             background: rgba(0, 0, 0, 0.2);
  //             border-radius: 4px;
  //           }
  //           .katex-display::-webkit-scrollbar-thumb:hover {
  //             background: rgba(0, 0, 0, 0.4);
  //           }
  //         `

  //         // Append the style element to the shadow root
  //         if (shadowRoot) {
  //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //           const rootElement: any = shadowRoot.querySelector('.page')

  //           if (rootElement) {
  //             // Update the CSS variables
  //             rootElement.style.setProperty(
  //               '--textwidth',
  //               `${textWidthInPercent}%`
  //             )
  //             rootElement.style.setProperty(
  //               '--marginleftwidth',
  //               `${textMarginLeftInPercent}%`
  //             )
  //             rootElement.style.setProperty(
  //               '--marginrightwidth',
  //               `${textMarginRightInPercent}%`
  //             )
  //           }
  //           shadowRoot.appendChild(style)
  //         }
  //       }, 300) // Delay to ensure shadow DOM is ready
  //     }
  //   }
  // }, [
  //   isLoaded,
  //   expression,
  //   useLargeScreenView,
  //   textMarginLeftInPercent,
  //   textMarginRightInPercent,
  //   textWidthInPercent,
  // ])

  // if (hasError) {
  //   return <div ref={containerRef}>{t('invalidLatexExpression')}</div>
  // }


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
