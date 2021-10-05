import axios from "axios";
import { baseAPIURL } from "../../shared/constants";

const client = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
  }
})

export default {
  getStudentModulesAndProblems(){
    return client.get('v1/module/WithNonHiddenProblems')
  }
}