import axios from "axios";
import { baseAPIURL } from "../../shared/constants";
const client = axios.create({
  baseURL: baseAPIURL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});

const apiWrapper = {
  getStudentModulesAndProblems() {
    return client.get("v1/module/WithNonHiddenProblems");
  },
  runCodeRequest(
    sourceCode: string,
    languageId: number,
    base64: boolean,
    stdin: string
  ) {
    const payload = {
      source_code: sourceCode,
      language_id: languageId,
      base_64: base64,
      stdin: stdin,
    };
    return client.post("v1/code/run", payload);
  },
  getCodeRequest({ runId, base_64 }: { runId: string; base_64: boolean }) {
    const payload = {
      base_64,
      runId,
    };
    return client.post(`v1/code/run/submission`, payload);
  },
  runCodeSubmission(
    sourceCode: string,
    languageId: number,
    base64: boolean,
    stdin: string,
    problemId: string
  ) {
    const payload = {
      source_code: sourceCode,
      language_id: languageId,
      base_64: base64,
      stdin: stdin,
      problemId: problemId,
    };
    return client.post(`v1/code/run/evaluate`, payload);
  },
};

export default apiWrapper;
