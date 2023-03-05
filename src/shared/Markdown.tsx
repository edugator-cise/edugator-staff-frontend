import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface Props {
  markdownString: string;
}

function Image(props: { alt: string } & any) {
  return <img alt={props.alt} {...props} style={{ maxWidth: "100%" }} />;
}

export const Markdown = ({ markdownString }: Props) => (
  <ReactMarkdown
    children={markdownString}
    components={{ img: Image }}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
  />
);
