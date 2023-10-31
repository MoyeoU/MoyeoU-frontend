import React, { useState } from "react";
import styled from "styled-components";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftjsToHtml from "draftjs-to-html";
import { useEffect } from "react";
import htmlToDraft from "html-to-draftjs";

const TextEditor = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const html = draftjsToHtml(convertToRaw(editorState.getCurrentContent()));
    //setHtmlString(html);
    props.setContent(html);
  };

  const uploadCallback = () => {
    console.log("이미지 업로드");
  };

  useEffect(() => {
    const blocksFromHtml = htmlToDraft(props.content);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container>
        <Editor
          editorClassName="DraftEditor-root"
          placeholder="스터디 소개글을 작성해주세요"
          editorState={editorState}
          onEditorStateChange={updateTextDescription}
          toolbar={{
            image: { uploadCallback: uploadCallback },
          }}
          localization={{ locale: "ko" }}
          editorStyle={{
            height: "400px",
            width: "100%",
            border: "3px solid lightgray",
            padding: "20px",
          }}
        />
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  .DraftEditor-root {
    font-size: 15px;
  }
`;

export default TextEditor;
