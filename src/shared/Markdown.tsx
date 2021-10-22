import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  markdownString: string;
}

export const Markdown = ({ markdownString }: Props) => (
  <ReactMarkdown children={markdownString} remarkPlugins={[remarkGfm]} />
);
