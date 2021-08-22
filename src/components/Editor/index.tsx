import React from "react";

import { EditorView } from "@codemirror/view";
import { EditorState, Compartment } from "@codemirror/state";
import { basicSetup } from "@codemirror/basic-setup";
import { javascript } from "@codemirror/lang-javascript";

const Editor = ({ value }: { value: string }) => {
  const innerRef = React.useRef<HTMLDivElement>(null);

  let language = new Compartment();

  const extensions = React.useMemo(() => [basicSetup, language.of(javascript()), EditorView.editable.of(false)], []);

  React.useEffect(() => {
    const currentEditor = innerRef.current;
    if (!currentEditor) return;

    const state = EditorState.create({
      doc: value,
      extensions,
    });
    const view = new EditorView({
      parent: currentEditor,
      state,
    });

    return () => view.destroy();
  }, [innerRef, value]);

  return <div ref={innerRef}></div>;
};

export default Editor;
