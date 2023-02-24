import React, { useState, useRef, useEffect } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import { mediaBlockRenderer } from "./entities/mediaBlockRenderer";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { MultipleChoiceModal } from "./components/MultipleChoiceModal";
import draftToHtml from "draftjs-to-html";
import {
  TextHOne,
  TextHTwo,
  TextHThree,
  Code,
  TextItalic,
  TextBolder,
  TextUnderline,
  Image,
  ListBullets,
  ListChecks,
} from "phosphor-react";
import { useSelector } from "react-redux";
import { RootState } from "lib/store/store";
import MultipleSelectModal, {
  ModalAnswer,
} from "./components/MultipleSelectModal";
import { ILesson } from "lib/shared/types";

const TextEditorContent = ({
  callbackData,
  rawLesson,
}: {
  callbackData: (atomicEntities: any, html: string, rawData: any) => void;
  rawLesson?: ILesson;
}) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [html, setHTML] = useState("");
  const [MCModalOpen, setMCModalOpen] = useState(false);
  const [MSModalOpen, setMSModalOpen] = useState(false);

  // check if the lesson has a title (we are editing a lesson)
  const contentId = useSelector(
    (state: RootState) => state.contentEditorPage.contentId
  );

  useEffect(() => {
    if (rawLesson) {
      const convertedContent = convertFromRaw({
        // @ts-ignore
        blocks: rawLesson.editableContent.blocks,
        // @ts-ignore
        entityMap: rawLesson.editableContent.entityMap || {},
      });

      // convert from raw back to editor state
      setEditorState(EditorState.createWithContent(convertedContent));
    }
  }, [contentId]);

  const customEntityTransform = (entity: any, text: string) => {
    if (
      entity.type === "image" ||
      entity.type === "multiple_choice" ||
      entity.type === "multiple_select"
    )
      return "<atomic_entity />";
  };

  const onTrigger = () => {
    const atomicEntities = getEntities(editorState);
    const rawData = convertToRaw(editorState.getCurrentContent());
    callbackData(atomicEntities, html, rawData);
  };

  const getEntities = (editorState: any, entityType = null) => {
    const content = editorState.getCurrentContent();
    const entities: any[] = [];
    content.getBlocksAsArray().forEach((block: any) => {
      let selectedEntity: any = null;
      block.findEntityRanges(
        (character: any) => {
          if (character.getEntity() !== null) {
            const entity = content.getEntity(character.getEntity());
            if (
              !entityType ||
              (entityType && entity.getType() === entityType)
            ) {
              selectedEntity = {
                entityKey: character.getEntity(),
                blockKey: block.getKey(),
                data: content.getEntity(character.getEntity()).getData(),
                type: content.getEntity(character.getEntity()).getType(),
              };
              return true;
            }
          }
          return false;
        },
        (start: any, end: any) => {
          entities.push({ ...selectedEntity, start, end });
        }
      );
    });
    return entities;
  };

  const editor = useRef<Editor>(null);

  const focus = () => {
    editor.current?.focus();
  };

  const onChange = (editorState: EditorState) => {
    const html = draftToHtml(
      convertToRaw(editorState.getCurrentContent()),
      {},
      false,
      customEntityTransform
    );
    onTrigger();
    setEditorState(editorState);
    setHTML(html);
  };

  const onAddMultipleSelect = (
    e: any,
    question: string,
    answers: ModalAnswer[]
  ) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "multiple_select",
      "IMMUTABLE",
      { question, answers }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
    setMSModalOpen(false);
    setTimeout(() => focus(), 0);
  };

  const onAddMultipleChoice = (
    e: any,
    question: string,
    answers: string[],
    correct: number
  ) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "multiple_choice",
      "IMMUTABLE",
      { question, answers, correct }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
    setMCModalOpen(false);
    setTimeout(() => focus(), 0);
  };

  const onAddImage = (e: any) => {
    e.preventDefault();
    const urlValue = window.prompt("Enter a URL");
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
    setTimeout(() => focus(), 0);
  };

  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const onUnderlineClick = (e: any) => {
    e.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const onBoldClick = (e: any) => {
    e.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onItalicClick = (e: any) => {
    e.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const onH1Click = (e: any) => {
    e.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, "header-one"));
  };

  const onH2Click = (e: any) => {
    e.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, "header-two"));
  };

  const onH3Click = (e: any) => {
    e.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, "header-three"));
  };

  const onCodeClick = (e: any) => {
    e.preventDefault();
    onChange(RichUtils.toggleBlockType(editorState, "code-block"));
  };

  return (
    <div className="contentEditor">
      <MultipleChoiceModal
        insert={onAddMultipleChoice}
        open={MCModalOpen}
        setOpen={setMCModalOpen}
      />
      <MultipleSelectModal
        insert={onAddMultipleSelect}
        open={MSModalOpen}
        setOpen={setMSModalOpen}
      />

      <button onClick={onH1Click}>
        <TextHOne weight="bold" size={18} />
      </button>
      <button onClick={onH2Click}>
        <TextHTwo weight="bold" size={18} />
      </button>
      <button onClick={onH3Click}>
        <TextHThree weight="bold" size={18} />
      </button>
      <button onClick={onCodeClick}>
        <Code weight="bold" size={18} />
      </button>
      <button onClick={onUnderlineClick}>
        <TextUnderline weight="bold" size={18} />
      </button>
      <button onClick={onBoldClick}>
        <TextBolder weight="bold" size={18} />
      </button>
      <button onClick={onItalicClick}>
        <TextItalic weight="bold" size={18} />
      </button>
      <button onClick={onAddImage}>
        <Image weight="bold" size={18} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setMCModalOpen(true);
        }}
      >
        <ListBullets weight="bold" size={18} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setMSModalOpen(true);
        }}
      >
        <ListChecks weight="bold" size={18} />
      </button>
      <div className="editor">
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          blockRendererFn={mediaBlockRenderer}
          ref={editor}
        />
      </div>
    </div>
  );
};

export default TextEditorContent;
