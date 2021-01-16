import React from "react";
import Card from "../components/card";
import Switch from "../components/switch";
import { withRouter } from "react-router-dom";

const Login = (props) => {
	const [isDark, setIsDark] = React.useState(false);
	const [username, setUsername] = React.useState(null);
	const [room, setRoom] = React.useState(null);
	const [token, setToken] = React.useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (username !== null && room !== null && token !== null) {
			props.history.push(`/chat?token=${token}&username=${username}&room=${room}`);
		}
	};

	return (
		<>
			<div className={`${isDark ? "dark" : ""} h-screen`}>
				<div className="w-full h-screen  bg-light-100 dark:bg-dark-900">
					<div className="w-full container pt-4">
						<div className="flex flex-row-reverse" style={{ flex: "1 1 0" }}>
							<Switch
								onChange={(value) => {
									setIsDark(value);
								}}
								name="darkmode"
							/>
							<span
								class="dark:text-white block text-gray-700 text-sm font-bold mb-2 pr-6"
								for="username"
							>
								Dark Mode
							</span>
						</div>
					</div>
					<div className="w-full" style={{ marginTop: "64px" }}>
						<div className="flex flex-col justify-center items-center">
							<div className=" dark:text-white font-semibold text-2xl mb-6 text-center">
								Welcome Back !
							</div>
							<div style={{ width: "380px" }}>
								<Card>
									<div className="p-4">
										<div className="mb-4">
											<label
												className="dark:text-white block text-gray-700 text-sm font-bold mb-2"
												for="username"
											>
												Username
											</label>
											<input
												onChange={(event) => setUsername(event.target.value)}
												className="focus:ring-1 dark:text-white shadow focus:outline-none w-full text-sm bg-white dark:bg-dark-500 border-transparent-100 text-black placeholder-gray-500 border  py-2 px-3 appearance-none border rounded  py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
												id="username"
												type="text"
												// placeholder="Username"
											></input>
										</div>
										<div className="mb-6">
											<label
												className="dark:text-white block text-gray-700 text-sm font-bold mb-2"
												for="tenant"
											>
												Tenant
											</label>
											<input
												onChange={(event) => setToken(event.target.value)}
												className="focus:ring-1 dark:text-white shadow focus:outline-none w-full text-sm bg-white dark:bg-dark-500 border-transparent-100 text-black placeholder-gray-500 border  py-2 px-3 appearance-none border rounded  py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
												id="tenant"
												type="text"
												// placeholder="Username"
											></input>
											{/* <input
												className="dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												id="tenant"
												type="text"
												// placeholder="Username"
											></input> */}
										</div>
										<div className="mb-6">
											<label
												className="dark:text-white block text-gray-700 text-sm font-bold mb-2"
												for="room"
											>
												Room
											</label>
											<input
												onChange={(event) => setRoom(event.target.value)}
												className="focus:ring-1 dark:text-white shadow focus:outline-none w-full text-sm bg-white dark:bg-dark-500 border-transparent-100 text-black placeholder-gray-500 border  py-2 px-3 appearance-none border rounded  py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
												id="room"
												type="text"
												// placeholder="Username"
											></input>
											{/* <input
												className="dark:text-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
												id="tenant"
												type="text"
												// placeholder="Username"
											></input> */}
										</div>
										<button
											onClick={handleSubmit}
											className=" w-full bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
											type="button"
										>
											Sign In
										</button>
									</div>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default withRouter(Login);
