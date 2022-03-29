import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import {stateToHTML} from 'draft-js-export-html';

export const EditorContent = (props: {content: EditorState, id: number, setContent: Function}) => {
    const [editorState, setEditorState] = useState(props.content)
    const [html, setHtml] = useState("")
  
    useEffect(() => {
      console.log("loaded number " + props.id);
    })
  
    const editorId = props.id;
  
    return (
      <div className="editor">
        <Editor
          //Update and show text box content
          editorState={editorState}
          onEditorStateChange={(editorState) => {
            let html = stateToHTML(editorState.getCurrentContent());
            console.log(html)
            setHtml(html)
            props.setContent(editorId, html, editorState);
            setEditorState(editorState)}
          }
          //Display toolbar on top
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
          } }
        />
      </div>
    )
  }