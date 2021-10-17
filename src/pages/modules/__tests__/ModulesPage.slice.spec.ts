import axios from "axios";
import store from "../../../app/common/store";
import { IModule, IModuleState } from "../types";
import {
  getBaseModuleState,
  requestModules,
  requestNewModule,
  clearState,
} from "../ModulesPage.slice";

const dispatch = store.dispatch;
let modulesState: IModuleState;
let baseState: IModuleState;

beforeEach(() => {
  baseState = getBaseModuleState();
  dispatch(clearState());
});

describe("Modules Reducer Base State", () => {
  test("it should have no modules before fetching from the database", () => {
    expect(baseState.modules).toEqual([]);
  });
  test("it should not be loading until fetching from the database", () => {
    expect(baseState.isLoading).toBe(false);
  });
  test("it should not display any feedback before doing any actions", () => {
    expect(baseState.feedback.display).toBe(false);
  });
});

const mockData = {
  newModule: {
    payload: { name: "Test 0", number: 0 },
    response: { data: "asdfgh" },
  },
  modulesFound: {
    data: [
      { name: "Test 1", number: 0, problems: [] },
      { name: "Test 2", number: 1, problems: [] },
    ],
  },
  get_failure: {
    // needs more error message variety
    message: "Request failed with a 401 code",
  },
};

jest.mock("axios");
const axios_mock = axios as jest.Mocked<typeof axios>;

describe("Modules: Getting Modules", () => {
  test("it should get modules when fetching from v1/module/WithProblems", async () => {
    axios_mock.request.mockImplementationOnce(
      () => Promise.resolve(mockData.modulesFound) // success
    );
    let expected = mockData.modulesFound.data;

    await dispatch(requestModules()); // await does have an effect
    modulesState = store.getState().modules;

    expect(modulesState.modules).toEqual(expected);
  });

  test("it should offer feedback when fetching modules fails", async () => {
    axios_mock.request.mockImplementationOnce(
      () => Promise.reject(mockData.get_failure) // reject
    );
    let expected_msg = mockData.get_failure.message;

    await dispatch(requestModules());
    modulesState = store.getState().modules;

    expect(modulesState.feedback.message).toEqual(expected_msg);
    expect(modulesState.feedback.display).toEqual(true);
  });
});

describe("Modules: Adding a Module", () => {
  test("it should add a module successfully", async () => {
    axios_mock.request.mockImplementationOnce(() =>
      Promise.resolve(mockData.newModule.response)
    );
    let expected: IModule = {
      name: mockData.newModule.payload.name,
      number: mockData.newModule.payload.number,
      problems: [],
      _id: mockData.newModule.response.data,
    };

    await dispatch(requestNewModule(mockData.newModule.payload));
    modulesState = store.getState().modules;

    expect(modulesState.modules).toEqual([expected]);
  });

  test("it should offer feedback when adding a module fails", async () => {
    axios_mock.request.mockImplementationOnce(() =>
      Promise.reject(mockData.get_failure)
    );
    let expected_msg = mockData.get_failure.message;

    await dispatch(requestNewModule(mockData.newModule.payload));
    modulesState = store.getState().modules;

    // needs more error message variety
    expect(modulesState.feedback.message).toEqual(expected_msg);
    expect(modulesState.feedback.display).toEqual(true);
  });
});
