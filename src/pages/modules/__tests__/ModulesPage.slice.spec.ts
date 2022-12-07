import store from "../../../app/common/store";
import { IModuleState, IAdminModule } from "../types";
import {
  getBaseModuleState,
  requestModules,
  requestNewModule,
  requestModifyModule,
  requestDeleteModule,
  clearState,
} from "../ModulesPage.slice";
import adminAPI from "../../../app/common/apiClient";

const dispatch = store.dispatch;
let modulesState: IModuleState;
let baseState: IModuleState;

beforeEach(() => {
  // TODO need to use better,
  // more specialized to every case
  // for better setup, in the future
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
  modulesFound: {
    data: [
      { name: "Test 1", number: 0, problems: [], lessons: [] },
      { name: "Test 2", number: 1, problems: [], lessons: [] },
    ],
  },
  newModule: {
    payload: { name: "Test 0", number: 0 },
    response: { data: { id: "new0" } },
  },
  updatedModule: {
    data: {
      name: "Updated Name 0",
      number: 99,
      _id: "new0",
    },
  },
  deletingModule: {
    data: {
      response: { message: "Module successfully deleted" },
      _id: "new0",
    },
  },
  get_failure: {
    // needs more error message variety
    message: "Request failed with a 401 code",
  },
};

jest.mock("../../../app/common/apiClient");
const adminAPI_mock = adminAPI as jest.Mocked<typeof adminAPI>;

describe("Modules: Getting Modules", () => {
  test("it should get modules when fetching from v1/module/WithProblems", async () => {
    adminAPI_mock.get.mockResolvedValueOnce(mockData.modulesFound);

    await dispatch(requestModules()); // await does have an effect
    const expected = mockData.modulesFound.data;

    modulesState = store.getState().modules;

    expect(modulesState.modules).toEqual(expected);
  });

  test("it should offer feedback when fetching modules fails", async () => {
    adminAPI_mock.get.mockRejectedValueOnce(mockData.get_failure);

    await dispatch(requestModules());
    const expected_msg = mockData.get_failure.message;

    modulesState = store.getState().modules;

    expect(modulesState.feedback.message).toEqual(expected_msg);
    expect(modulesState.feedback.display).toEqual(true);
  });
});

describe("Modules: Adding a Module", () => {
  test("it should add a module successfully", async () => {
    adminAPI_mock.post.mockResolvedValueOnce(mockData.newModule.response);

    await dispatch(requestNewModule(mockData.newModule.payload));
    const expected: IAdminModule = {
      name: mockData.newModule.payload.name,
      number: mockData.newModule.payload.number,
      problems: [],
      lessons: [],
      _id: mockData.newModule.response.data.id,
    };

    modulesState = store.getState().modules;

    expect(modulesState.modules).toEqual([expected]);
  });

  test("it should offer feedback when adding a module fails", async () => {
    adminAPI_mock.post.mockRejectedValueOnce(mockData.get_failure);

    await dispatch(requestNewModule(mockData.newModule.payload));
    const expected_msg = mockData.get_failure.message;

    modulesState = store.getState().modules;

    // needs more error message variety
    expect(modulesState.feedback.message).toEqual(expected_msg);
    expect(modulesState.feedback.display).toEqual(true);
  });
});

describe("Modules: Editing a Module", () => {
  test("it should edit a module successfully", async () => {
    // adding fake module
    adminAPI_mock.post.mockResolvedValueOnce(mockData.newModule.response);
    await dispatch(requestNewModule(mockData.newModule.payload));

    // modifying fake module
    adminAPI_mock.put.mockResolvedValueOnce(mockData.updatedModule);
    await dispatch(requestModifyModule(mockData.updatedModule.data));
    // I expect my changes to have gone through

    modulesState = store.getState().modules;
    let expected = {
      ...mockData.updatedModule.data,
      problems: [],
      lessons: [],
    };

    expect(modulesState.modules).toEqual([expected]);
    // could check for positive feedback messages as well
  });

  test("it should offer feedback when modifying a module fails", async () => {
    adminAPI_mock.post.mockRejectedValueOnce(mockData.get_failure);

    await dispatch(requestNewModule(mockData.newModule.payload));
    const expected_msg = mockData.get_failure.message;

    modulesState = store.getState().modules;

    // needs more error message variety
    expect(modulesState.feedback.message).toEqual(expected_msg);
    expect(modulesState.feedback.display).toEqual(true);
  });
});

describe("Modules: Deleting a Module", () => {
  test("it should delete an existing module successfully", async () => {
    // adding fake module
    adminAPI_mock.post.mockResolvedValueOnce(mockData.newModule.response);
    await dispatch(requestNewModule(mockData.newModule.payload));

    // delete fake module
    adminAPI_mock.delete.mockResolvedValueOnce(mockData.deletingModule);
    await dispatch(requestDeleteModule(mockData.deletingModule.data._id));
    // I expect fake module to be gone

    modulesState = store.getState().modules;

    expect(modulesState.modules).toEqual([]);
  });

  test("it should offer feedback when deleting a module fails", async () => {
    adminAPI_mock.delete.mockRejectedValueOnce(mockData.get_failure);

    await dispatch(requestDeleteModule(mockData.deletingModule.data._id));
    const expected_msg = mockData.get_failure.message;

    modulesState = store.getState().modules;

    // needs more error message variety
    expect(modulesState.feedback.message).toEqual(expected_msg);
    expect(modulesState.feedback.display).toEqual(true);
  });
});
