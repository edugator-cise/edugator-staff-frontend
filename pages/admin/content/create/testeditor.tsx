import { OutputData } from "@editorjs/editorjs";
import AdminLayout from "components/AdminLayout/AdminLayout";
import EditorJsRenderer from "components/TestEditor/EditorJsRenderer";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";

// important that we use dynamic loading here
// editorjs should only be rendered on the client side.
const EditorBlock = dynamic(() => import("components/TestEditor/Editor"), {
  ssr: false,
});

const TestEditor = () => {
  const [data, setData] = useState<OutputData>();
  return (
    <div className="w-full grid grid-cols-2 gap-2 bg-slate-200 text-nav-darkest px-4 min-h-screen">
      <div className="col-span-1 ">
        <h1 className="font-dm text-xl">Editor</h1>
        <div className="border rounded-md bg-slate-50">
          <EditorBlock
            data={data}
            onChange={setData}
            holder="editorjs-container"
          />
        </div>
      </div>
      <div className="col-span-1 ">
        <h1 className="font-dm text-xl">Preview</h1>
        <div className="border rounded-md bg-slate-50">
          <div className="p-8">{data && <EditorJsRenderer data={data} />}</div>
        </div>
      </div>
    </div>
  );
};

TestEditor.getLayout = (page: NextPage) => {
  return <AdminLayout pageTitle="New Lesson">{page}</AdminLayout>;
};

export default TestEditor;
