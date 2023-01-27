import { AxiosError } from "axios";
import { LocalStorage } from "../../../../lib/auth/LocalStorage";

describe("LocalStorage", () => {
  describe("getToken", () => {
    it("should return null if the token is not set", () => {
      expect(LocalStorage.getToken()).toBeNull();
    });

    it("should return the token if it is set", () => {
      LocalStorage.setToken("test");
      expect(LocalStorage.getToken()).not.toBeNull();
    });

    it("should return null if the token is deleted", () => {
      LocalStorage.setToken("test");
      LocalStorage.removeToken();
      expect(LocalStorage.getToken()).toBeNull();
    });
  });

  describe("checkUnauthorized", () => {
    it("should handle AxiosErrors 401 Unauthorized", () => {
      const param: AxiosError<any> = {
        response: {
          status: 401,
          data: null,
          statusText: "",
          headers: "",
          config: {},
        },
        config: {},
        isAxiosError: true,
        toJSON: jest.fn(),
        name: "",
        message: "",
      };
      expect(LocalStorage.checkUnauthorized(param)).toBeTruthy();
    });

    it("should handle AxiosErrors 404 Not found", () => {
      const param: AxiosError<any> = {
        response: {
          status: 404,
          data: null,
          statusText: "",
          headers: "",
          config: {},
        },
        config: {},
        isAxiosError: true,
        toJSON: jest.fn(),
        name: "",
        message: "",
      };
      expect(LocalStorage.checkUnauthorized(param)).toBeFalsy();
    });

    it("should handle non-axios Errors", () => {
      const param: Error = { name: "", message: "" };
      expect(LocalStorage.checkUnauthorized(param)).toBeFalsy();
    });

    it("should handle random types", () => {
      const param = "test";
      expect(LocalStorage.checkUnauthorized(param)).toBeFalsy();
    });
  });
});
