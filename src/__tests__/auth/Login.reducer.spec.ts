import {
	receiveLoginFailure,
	receiveLoginSuccess,
	requestLogin,
} from "../../app/Login/Login.actions";
import loginReducer, {
	getInitialAuthState,
} from "../../app/Login/Login.reducer";

describe("Auth Reducer", () => {
	it("should handle request login", () => {
		const actual = loginReducer(
			getInitialAuthState(),
			requestLogin("josh", "test")
		);
		const expected = getInitialAuthState();
		expected.authorizationToken = "";
		expected.errorMessage = "";
		expected.isLoading = true;
		expect(actual).toEqual(expected);
	});

	it("should handle receive login success", () => {
		const token = "test";
		const actual = loginReducer(
			{ ...getInitialAuthState(), isLoading: true },
			receiveLoginSuccess(token)
		);
		const expected = getInitialAuthState();
		expected.authorizationToken = token;
		expected.errorMessage = "";
		expected.isLoading = false;
		expect(actual).toEqual(expected);
	});

	it("should handle receive login failure", () => {
		const message = "test";
		const actual = loginReducer(
			{ ...getInitialAuthState(), isLoading: true },
			receiveLoginFailure(message)
		);
		const expected = getInitialAuthState();
		expected.authorizationToken = "";
		expected.errorMessage = message;
		expected.isLoading = false;
		expect(actual).toEqual(expected);
	});
});
