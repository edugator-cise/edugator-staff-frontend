import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../common/store";
import { requestLogin } from "./auth.actions";

export function LoginPage(): React.ReactElement {
	const dispatch = useDispatch();
	const authState = useSelector((state: RootState) => state.auth);

	return (
		<div>
			<h1>login</h1>
			<p>isLoading: {authState.isLoading ? "True" : "False"}</p>
			<p>errorMessage: {authState.errorMessage}</p>
			<p>token: {authState.authorizationToken}</p>
			<button onClick={() => dispatch(requestLogin("test", "test"))}>
				Login Test
			</button>
		</div>
	);
}
