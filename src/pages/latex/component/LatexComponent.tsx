import React, { useEffect, useState } from 'react';

// Import the locally saved LaTeX.js file
import '@/latex.mjs';  // Adjust path if necessary

interface Props {
    expression: string
    escape?: boolean
}

const LaTeXComponent = ({expression, escape}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false);


  const escapeLatexString = (str: string) => {
    const sanitized = str.replace(/\\+/g, (match) => match.repeat(2));
    return sanitized
  };

  useEffect(() => {
    // Needed css for math styles
    const loadCSS = () => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/latex.js@0.12.6/dist/css/katex.min.css';
        document.head.appendChild(link);
      };

    // Once the LaTeX.js script is loaded, set up the custom element
    const loadLatexModule = async () => {
      try {
        // Import the LaTeXJSComponent from the local file
        const module = await import('@/latex.mjs');
        customElements.define('latex-js', module.LaTeXJSComponent);
        setIsLoaded(true); // After the module is loaded, update the state
      } catch (error) {
        console.error('Error loading LaTeX module:', error);
      }
    };

    loadCSS()
    loadLatexModule(); // Trigger the dynamic import

  }, []); // Only run once on component mount

  return (
    <div style={{
        display: 'inline-block',
        border: '1px solid red',
        marginRight: '2em'
    }}>
        
      <h1>Rendered LaTeX Example</h1>
      {isLoaded ? (
        <latex-js baseURL="https://cdn.jsdelivr.net/npm/latex.js/dist/">
            {escape ? escapeLatexString(expression): expression}
        </latex-js>
      ) : (
        <p>Loading...</p>
      )}


    </div>
  );
};

export default LaTeXComponent;
