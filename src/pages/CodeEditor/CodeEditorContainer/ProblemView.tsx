import React from "react"
import {Markdown} from "../../../shared/Markdown"
import { Paper } from "@mui/material"

interface Props {
  problemTitle: string,
  problemStatement: string 
}
export const ProblemView = ({problemTitle, problemStatement}: Props) => {
  return (
    <Paper>
      {problemTitle}
      <Markdown markdownString={problemStatement} />
    </Paper>
  )
}