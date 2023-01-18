import PlaygroundLayout from "components/PlaygroundLayout";
import { ReactNode } from "react";

export default function LearnPage() {
  return <div>Hello Lesson!</div>;
}

LearnPage.getLayout = function getLayout(page: ReactNode) {
  return <PlaygroundLayout>{page}</PlaygroundLayout>;
};
