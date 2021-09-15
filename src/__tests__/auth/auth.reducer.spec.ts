import {
	receiveLoginFailure,
	receiveLoginSuccess,
	requestLogin,
} from "../../app/auth/auth.actions";
import authReducer, { getInitialAuthState } from "../../app/auth/auth.reducer";

describe("Auth Reducer", () => {
	it("should handle request login", () => {
		const actual = authReducer(
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
		const actual = authReducer(
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
		const actual = authReducer(
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
