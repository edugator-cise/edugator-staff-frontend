import { call, put, takeEvery } from "redux-saga/effects";
import {
  requestModulesAndProblems,
  setNavStructure,
  setProblems,
  setIsLoading
} from "./CodeEditorSlice";
import api from "../../app/common/api"
import {IModuleWithProblems, IModuleItem} from "./types"
import {IProblem} from "../modules/types"

function filterForProblems(moduleProblemStructure: IModuleWithProblems[]) {
  const problems: IProblem[] = []
  moduleProblemStructure.forEach(element => problems.concat(element.problems))
  return problems;
}
function createNavStructure(moduleProblemStructure: IModuleWithProblems[]) {
  const moduleItems: IModuleItem[] = []
  moduleProblemStructure.forEach(element => {
    const payload = {
      _id: element._id,
      name: element.name,
      problems: element.problems.map(el => ({ problemName: el.title, _id: el._id}))
    }
    moduleItems.push(payload)
  })
  return moduleItems
}
function* handleRequestModulesAndProblems() {
  try {
    const { data }: { data: IModuleWithProblems[] } = yield call(async () => {
      return api.getStudentModulesAndProblems();
    });
    yield put(setProblems(filterForProblems(data)))
    yield put(setNavStructure(createNavStructure(data)))
    yield put(setIsLoading(false))
  } catch (e) {

  }
}

function* codeEditorSaga() {
  yield takeEvery(requestModulesAndProblems.type, handleRequestModulesAndProblems);
}

export default codeEditorSaga;