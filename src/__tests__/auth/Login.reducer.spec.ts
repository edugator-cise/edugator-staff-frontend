import store from "../../app/common/store";
import {
	receiveLoginFailure,
	receiveLoginSuccess,
	requestLogin,
} from "../../app/Login/Login.slice";

describe("Auth Reducer", () => {
	it("should handle request login", () => {
		const baseLoginState = store.getState().login;

		store.dispatch(requestLogin({ username: "test", password: "test" }));

		const expected = {
			...baseLoginState,
			authorizationToken: "",
			errorMessage: "",
			isLoading: true,
		};
		expect(store.getState().login).toEqual(expected);
	});

	it("should handle receive login success", () => {
		const baseLoginState = store.getState().login;

		const token = "token";
		store.dispatch(receiveLoginSuccess(token));

		const expected = {
			...baseLoginState,
			authorizationToken: token,
			errorMessage: "",
			isLoading: false,
		};
		expect(store.getState().login).toEqual(expected);
	});

	it("should handle receive login success", () => {
		const baseLoginState = store.getState().login;

		const msg = "test-error";
		store.dispatch(receiveLoginFailure(msg));

		const expected = {
			...baseLoginState,
			authorizationToken: "",
			errorMessage: msg,
			isLoading: false,
		};
		expect(store.getState().login).toEqual(expected);
	});
});
