import React from "react";
import ListItem from "../components/ListItem";
import Switch from "../components/switch";
import { io } from "socket.io-client";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import Card from "../components/card";
import MessagePanel from "./MessagePanel";

const ENDPOINT = "http://localhost:8080";
let socket;

const Chat = (props) => {
	const [messages, setMessages] = React.useState([]);
	const [users, setUsers] = React.useState({});

	const setupSocket = () => {
		let data = queryString.parse(props.location.search);
		let request = {
			username: data.username,
			room: data.room,
		};

		let connection = `${ENDPOINT}/${data.token}`;

		socket = io(connection, { transports: ["websocket"] });

		socket.emit("user:joinRoom", request);
		setUsers(request);
	};

	const handleRoomAndChat = () => {
		socket.on("user:message", (msg) => {
			setMessages((messages) => [...messages, msg]);
		});

		socket.on("user:roomUsers", (users) => {
			console.log("users data", users);
		});
	};

	const handleSendMessage = (msg) => {
		socket.emit("user:sendMessage", msg);
	};

	React.useEffect(() => {
		setupSocket();
	}, [ENDPOINT, props.location.search]);

	React.useEffect(() => {
		handleRoomAndChat();
	}, []);

	return (
		<>
			<div className="w-screen h-screen  bg-light-100 dark:bg-dark-900">
				<main className="main flex container mx-auto max-w-screen-lg">
					<nav
						className="w-0 sm:w-64 bg-light-100 dark:bg-dark-900 text-black "
						style={{ maxHeight: "100vh" }}
					>
						<div className="pt-4">
							<div className="bg-white dark:bg-dark-500 flex flex-row p-4 rounded-xl text-sm mb-4">
								<img
									className="w-10 h-10 rounded-full"
									alt="profile"
									src={`https://unavatar.now.sh/${users ? users.username : "kikobeats"}`}
								/>
								<div style={{ display: "flex", flexDirection: "column", paddingLeft: "24px" }}>
									<div className="text-black dark:text-white text-sm font-semibold">
										{users.username}
									</div>
									<div className="dark:text-white text-xs text-gray-700">Room : {users.room}</div>
								</div>
							</div>
						</div>
						<div className="bg-white dark:bg-dark-500 flex flex-col p-4 rounded-xl text-sm mb-4">
							<ListItem
								title="Dark Mode"
								action={
									<Switch
										name="darkmode"
										onChange={(value) => {
											if (value) {
												document.querySelector("html").classList.add("dark");
											} else {
												document.querySelector("html").classList.remove("dark");
											}
										}}
									/>
								}
							/>
						</div>
						<div className="bg-white dark:bg-dark-500 flex flex-col p-4 rounded-xl text-sm mb-4">
							<button
								onClick={() => props.history.push("/")}
								className="  border  border-1  dark:bg-dark-500 w-full dark:text-white font-semibold    py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								type="button"
							>
								Quit Room
							</button>
						</div>
					</nav>
					<div className="flex-1 bg-light-100 dark:bg-dark-900 h-screen pt-4 pl-4">
						<div
							className="bg-white dark:bg-dark-500 flex flex-col p-4 rounded-xl text-sm mb-4"
							style={{ height: "calc(100vh - 89px)", overflow: "auto" }}
						>
							<MessagePanel chats={messages} onSendMessage={handleSendMessage} users={users} />
						</div>
					</div>
				</main>
			</div>
		</>
	);
};
export default withRouter(Chat);
