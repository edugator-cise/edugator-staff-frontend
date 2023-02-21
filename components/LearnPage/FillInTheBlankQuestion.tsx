import { blankAnswer } from "components/ContentEditor/components/exportStructures";
import { FillInTheBlankDisplayBlock } from "components/ContentEditor/components/displayBlockComponents";

interface FillIntheBlankProps {
    questionSegments: string[];
    correctAnswers: blankAnswer[];
    number: number;
}

function FillIntheBlankQuestion(props: FillIntheBlankProps) {
    return (
        <FillInTheBlankDisplayBlock
            questionSegments={props.questionSegments}
            correctAnswers={props.correctAnswers}
            number={props.number}
        />
    )
}

export default FillIntheBlankQuestion;
