import {IProblem} from "../modules/types"
export interface IProblemItem {
  problemName: string,
  _id: string
}

export interface IModuleItem {
  name: string,
  _id: string,
  problems: IProblemItem[]
}


export interface IModuleWithProblems {
  _id: string,
  name: string,
  number: number,
  problems: IProblem[]
}
