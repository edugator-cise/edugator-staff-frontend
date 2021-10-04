import { AxiosError } from "axios";
import { LocalStorage } from "../../app/common/LocalStorage";

describe("LocalStorage", () => {
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
