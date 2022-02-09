// Import statements
import { useState } from "react";
import "./style.css";
import {CgMaximizeAlt} from "react-icons/cg";
import {FaCompressAlt} from "react-icons/fa";
import { marked } from "marked";
import Prism from "prismjs";

// Marked
marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, "javascript");
  }
});

// App
export default function App() {

  // States
  const [display, setDisplay] = useState(defaultText);
  const [editorMax, isEditorMax] = useState(false);
  const [previewMax, isPreviewMax] = useState(false);

  // Function: Change the preview if anything is written in editor
  function change(e) {
    setDisplay(e.target.value);
  }

  // Function: Change size of the editor/preview
  function changeSize(e) {
    let editor = document.getElementById("editor");
    let app = document.querySelector(".App");
    if (e === "e") {
      editor.classList.toggle("max");
      app.classList.remove("max");
      app.classList.toggle("see");
      isEditorMax((prev) => !prev);
    } else {
      app.classList.toggle("max");
      isPreviewMax((prev) => !prev);
    }
  }

  return (
    // App
    <div className="App">

      {/* Editor */}
      <div class="editor" id="editor-screen">

        {/* Editor Heading */}
        <h1>
          Editor
          <span onClick={() => changeSize("e")} className="size-change">
            {editorMax === true ? (
              <FaCompressAlt />
            ) : (
              <CgMaximizeAlt />
            )}
          </span>
        </h1>

        {/* Editor Textarea */}
        <textarea id="editor" className="" onChange={change} value={display} />
      </div>

      {/* Previewer */}
      <div class="previewer" id="preview-screen">

        {/* Previewer heading */}
        <h1>
          Preview
          <span onClick={() => changeSize("p")} className="size-change">
            {previewMax === true ? (
              <FaCompressAlt />
            ) : (
              <CgMaximizeAlt />
            )}
          </span>
        </h1>

        {/* Preview */}
        <div
          id="preview"
          dangerouslySetInnerHTML={{ __html: marked(display) }}
        />
      </div>

    </div>
  );
}

// Placeholder
const defaultText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;
