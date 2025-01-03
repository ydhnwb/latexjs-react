import Head from "next/head";
import LatexComponent from "./latex/component/LatexComponent";
import { useState } from "react";



export default function Home() {
  const [latex, setLatex] = useState<string>(''); // Store raw user input here

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const rawValue = event.target.value;
    setLatex(rawValue); // Update raw input state
  };

  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
              type="text/css"
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/latex.js@0.12.6/dist/css/article.css"
            />
            <link
              type="text/css"
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/latex.js@0.12.6/dist/css/base.css"
            />
            <link
              type="text/css"
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/latex.js@0.12.6/dist/css/book.css"
            />
            <link
              type="text/css"
              rel="stylesheet"
              href="https://cdn.jsdelivr.net/npm/latex.js@0.12.6/dist/css/katex.css"
            />
      </Head>
      <div>
      <div style={{flexDirection: 'column', display: 'flex'}}>
      <a href="https://latex.js.org/playground.html" target="_blank">Based on this latexjs library</a>
      <textarea
        value={latex} // Bind textarea value to state
        onChange={handleTextareaChange} // Update state on textarea change
        rows={10}
        cols={50}
        placeholder="Enter your LaTeX code"
      />

      </div>


      <h2>Rendered Output:</h2>
        <LatexComponent expression={latex} />
      </div>
    </>
  );
}
