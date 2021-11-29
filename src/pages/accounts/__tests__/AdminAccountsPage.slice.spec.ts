import store from "../../../app/common/store";
import adminAPI from "../../../app/common/apiClient";
import {
  resetState,
  requestAccounts,
  requestNewAccount,
  requestModifyAccount,
  requestDeleteAccount,
} from "../AdminAccountsPage.slice";
import { IAccount, rolesEnum } from "../types";

const dispatch = store.dispatch;

jest.mock("../../../app/common/apiClient");
const adminAPI_mock = adminAPI as jest.Mocked<typeof adminAPI>;

const getState = () => {
  return store.getState().accountManager;
};

beforeEach(() => {
  dispatch(resetState());
});

describe("Account Management Base State", () => {
  const { accounts, selectedAccount, currentAccount, loading } =
    store.getState().accountManager;

  it("starts with no accounts locally", () => {
    expect(accounts).toEqual([]);
  });
  it("starts with no account selected", () => {
    expect(selectedAccount).toBe(undefined);
  });
  it("starts with the current user's account being unknown", () => {
    expect(currentAccount).toBe(undefined);
  });
  it("starts loading accounts by default", () => {
    expect(loading).toBe(true);
  });
});

describe("API Call Handling", () => {
  describe("Getting Accounts using `requestAccounts`", () => {
    it("Updates the accounts when GET request succeeds", async () => {
      adminAPI_mock.get.mockResolvedValueOnce(sampleData.getAccounts);
      await dispatch(requestAccounts());

      const { accounts } = getState();

      expect(accounts).toEqual(sampleData.getAccounts.data.users);
    });

    it("Updates the current user when GET request succeeds", async () => {
      adminAPI_mock.get.mockResolvedValueOnce(sampleData.getAccounts);
      await dispatch(requestAccounts());

      const { currentAccount } = getState();
      const currentUserEmail = sampleData.getAccounts.data.currentUser;

      expect(currentAccount?.username).toEqual(currentUserEmail);
    });

    it("Notifies the user when getting accounts went wrong", async () => {
      adminAPI_mock.get.mockRejectedValueOnce(sampleData.error);
      await dispatch(requestAccounts());

      const { accounts, feedback } = getState();

      expect(accounts).toEqual([]);
      expect(feedback.display).toBe(true);
      expect(feedback.title).toBe("Getting accounts failed");
      expect(feedback.message).toBe(sampleData.error.response.data.message);
    });
  });
  describe("Creating an account using `requestNewAccount`", () => {
    it("Adds the account when POST request succeeds", async () => {
      adminAPI_mock.get.mockResolvedValueOnce(sampleData.getAccounts);
      await dispatch(requestAccounts());

      const action = sampleData.newAccount;

      adminAPI_mock.post.mockResolvedValueOnce(action.response);
      await dispatch(requestNewAccount(action.payload));

      const { accounts } = getState();

      const newAccount: IAccount = {
        name: action.payload.name,
        role: action.payload.role,
        username: action.payload.username,
        phone: action.payload.phone,
        _id: action.response.data.id,
      };

      const expected = [...sampleData.getAccounts.data.users, newAccount];

      expect(accounts).toEqual(expected);
    });

    it("Notifies the user when creating an account went wrong", async () => {
      adminAPI_mock.get.mockResolvedValueOnce(sampleData.getAccounts);
      await dispatch(requestAccounts());
      adminAPI_mock.post.mockRejectedValueOnce(sampleData.error);
      await dispatch(requestNewAccount(sampleData.newAccount.payload));

      const { accounts, feedback } = getState();

      expect(accounts).toEqual(sampleData.getAccounts.data.users);
      expect(feedback.display).toBe(true);
      expect(feedback.title).toBe("Adding new account failed");
      expect(feedback.message).toBe(sampleData.error.response.data.message);
    });
  });

  describe("Modifying an account using `requestModifyAccount`", () => {
    it("Modifies the account when PUT request succeeds", async () => {
      adminAPI_mock.get.mockResolvedValueOnce(sampleData.getAccounts);
      await dispatch(requestAccounts());

      const before_change = [...getState().accounts];
      const action = sampleData.modifiedAccount;

      adminAPI_mock.put.mockResolvedValueOnce(action.response);
      await dispatch(requestModifyAccount(action.payload));

      const { accounts } = getState();

      const updated = action.response.data;
      const index = before_change.findIndex((acc) => acc._id === updated._id);
      const expected = before_change.fill(updated, index, index + 1);

      expect(accounts).toEqual(expected);
    });

    it("Notifies the user when modifying an account went wrong", async () => {
      adminAPI_mock.get.mockResolvedValueOnce(sampleData.getAccounts);
      await dispatch(requestAccounts());
      adminAPI_mock.put.mockRejectedValueOnce(sampleData.error);
      await dispatch(requestModifyAccount(sampleData.modifiedAccount.payload));

      const { accounts, feedback } = getState();

      expect(accounts).toEqual(sampleData.getAccounts.data.users);
      expect(feedback.display).toBe(true);
      expect(feedback.title).toBe("Updating account failed");
      expect(feedback.message).toBe(sampleData.error.response.data.message);
    });
  });

  describe("Deleting an account using `requestDeleteAccount`", () => {
    it("Deletes the account when DELETE request succeeds", async () => {
      adminAPI_mock.get.mockResolvedValueOnce(sampleData.getAccounts);
      await dispatch(requestAccounts());

      let expected = [...getState().accounts];
      const action = sampleData.deleteAccount;

      adminAPI_mock.delete.mockResolvedValueOnce(action.response);
      await dispatch(requestDeleteAccount(action.payload));

      const { accounts } = getState();

      const removed = action.payload._id;
      expected = expected.filter((acc) => acc._id !== removed);

      expect(accounts).toEqual(expected);
    });

    it("Notifies the user when modifying an account went wrong", async () => {
      adminAPI_mock.get.mockResolvedValueOnce(sampleData.getAccounts);
      await dispatch(requestAccounts());
      adminAPI_mock.delete.mockRejectedValueOnce(sampleData.error);
      await dispatch(requestDeleteAccount(sampleData.deleteAccount.payload));

      const { accounts, feedback } = getState();

      expect(accounts).toEqual(sampleData.getAccounts.data.users);
      expect(feedback.display).toBe(true);
      expect(feedback.title).toBe("Deleting account failed");
      expect(feedback.message).toBe(sampleData.error.response.data.message);
    });
  });
});

const sampleData = {
  getAccounts: {
    data: {
      users: [
        { _id: "1", name: "test1", username: "a@test.com", role: "TA" },
        { _id: "2", name: "test2", username: "b@test.com", role: "TA" },
        { _id: "3", name: "test3", username: "c@test.com", role: "Professor" },
      ],
      currentUser: "c@test.com",
    },
  },
  newAccount: {
    payload: {
      name: "test4",
      username: "d@test.com",
      role: rolesEnum.TA,
      password: "...",
      phone: undefined,
    },
    response: {
      data: { id: "4" },
    },
  },
  modifiedAccount: {
    payload: {
      _id: "3",
      name: "test3 - renamed",
      role: rolesEnum.TA,
      username: "c@test.com",
    },
    response: {
      data: {
        _id: "3",
        name: "test3 - renamed",
        role: rolesEnum.TA,
        username: "c@test.com",
      },
    },
  },
  deleteAccount: {
    payload: {
      _id: "1",
      name: "test1",
      username: "a@test.com",
      role: rolesEnum.TA,
    },
    response: {
      data: {
        message: "Deleted successfully",
      },
    },
  },
  error: {
    response: {
      data: {
        message: "API call was rejected",
      },
    },
  },
};
