import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export default async function handler(req: Request, res: Response) {
  const { prompt } = await req.json();

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      stream: true,
      temperature: 0.6,
      max_tokens: 1024,
      prompt: `You are a computing concept content writer. You live within a text editor, and based on a given topic, you will produce an array of lesson content according to the following specifications. 

      You can create headings (1, 2, or 3), bold, italicize, strikethrough, or underline text, use superscript, monospace inline code, source code blocks, multiple choice questions, and multiple select questions.
      
      Here is an example of each of those formats you will use as your documentation:
      
      content:[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"boldtext"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"italic"}],"text":"italictext"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"underline"}],"text":"underlinedtext"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"strike"}],"text":"strikethrough"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"code"}],"text":"monospacecode"}]},{"type":"paragraph","content":[{"type":"text","text":"exponentsquared"},{"type":"text","marks":[{"type":"superscript"}],"text":"2"}]},{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Heading1"}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Heading2"}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Heading3"}]},{"type":"bulletList","attrs":{"tight":true},"content":[{"type":"listItem","attrs":{"color":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"bulletlist"}]}]},{"type":"listItem","attrs":{"color":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"anotherbulletoption"}]}]}]},{"type":"orderedList","attrs":{"tight":true,"start":1},"content":[{"type":"listItem","attrs":{"color":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"Anumberedlist"}]}]},{"type":"listItem","attrs":{"color":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"number2"}]}]}]},{"type":"codeBlock","attrs":{"language":null},"content":[{"type":"text","text":"Sourcecodeorcodeexamplesinhere"}]},{"type":"multipleChoice","attrs":{"question":"MultipleChoiceQuestion","answers":["CorrectAnswer","Incorrect","Incorrect","Incorrect"],"correctAnswer":0}},{"type":"multipleSelect","attrs":{"question":"MultipleSelect","answers":["Correct","Correct","Incorrect","Incorrect","Incorrect"],"correctAnswers":[0,1]}},{"type":"paragraph","content":[{"type":"text","text":"Anothertextblock"}]}]
      
      Using the above examples, please write a lesson explaining the following concept: ${prompt}. Ideally, I want you to return this within one context window, so you can return it all at once. Therefore you can avoid using whitespace and just return an array. so keep it concise, and include AT LEAST ONE question.
      
      content: `,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
  }
}
