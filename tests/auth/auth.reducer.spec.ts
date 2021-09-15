import { requestLogin } from "../../src/app/auth/auth.actions";
import authReducer, {
	getInitialAuthState,
} from "../../src/app/auth/auth.reducer";

describe("Auth Reducer", () => {
	it("should xyz", () => {
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
});
