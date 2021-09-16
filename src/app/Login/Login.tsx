import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../common/store";
import { requestLogin } from "./Login.slice";

export function LoginPage(): React.ReactElement {
	const dispatch = useDispatch();
	const authState = useSelector((state: RootState) => state.login);

	//Just a demo page for now to show that the dispatching/sagas and state work as expected
	return (
		<div>
			<h1>login</h1>
			<p>isLoading: {authState.isLoading ? "True" : "False"}</p>
			<p>errorMessage: {authState.errorMessage}</p>
			<p>token: {authState.authorizationToken}</p>
			<button
				onClick={() =>
					dispatch(requestLogin({ username: "test", password: "test" }))
				}
			>
				Login Test
			</button>
		</div>
	);
}
