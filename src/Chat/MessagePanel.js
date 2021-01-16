import React from "react";

const MessagePanel = ({ chats, onSendMessage, users }) => {
	const [input, setInput] = React.useState("");

	const sendMessage = () => {
		if (input && input != "") {
			onSendMessage(input);
			setInput("");
		}
	};

	const handleInput = (e) => {
		setInput(e.target.value);
	};

	return (
		<>
			<div
				style={{
					flex: "1 1 0",
					overflowY: "auto",
					paddingLeft: "24px",
					paddingRight: "24px",
					paddingTop: "12px",
					paddingBottom: "12px",
				}}
			>
				{chats.map((item, index) => {
					let position = users.username === item.username ? "flex-start" : "flex-end";
					let direction = users.username === item.username ? "left" : "right";
					// let broadcastMsg =
					// 	item.message !== undefined ? item.message.search("has joined the chat") : "-1";
					return (
						<div
							key={index}
							style={{
								display: "flex",
								width: "100%",
								justifyContent: position,
								flexDirection: "row",
								marginBottom: "14px",
							}}
						>
							<div style={{ display: "flex", flexDirection: "column" }}>
								<div
									className="border  border-1  dark:bg-dark-500"
									style={{
										borderRadius: "10px",
										marginLeft: "6px",
										padding: "8px",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<div
										style={{
											display: "flex",
											justifyContent: position,
										}}
									>
										<span className="dark:text-white font-semibold">{item.username}</span>
									</div>
									<span
										className="text-black dark:text-white"
										style={{ wordBreak: "break-word", fontSize: "12px" }}
									>
										{item.message}
									</span>
								</div>
							</div>
							{/* {broadcastMsg !== "-1" ? (
								alert(`${item.username}`)
							) : (
								<div style={{ display: "flex", flexDirection: "column" }}>
									<div
										className="border  border-1  dark:bg-dark-500"
										style={{
											borderRadius: "10px",
											marginLeft: "6px",
											padding: "8px",
											display: "flex",
											flexDirection: "column",
										}}
									>
										<div
											style={{
												display: "flex",
												justifyContent: position,
											}}
										>
											<span className="dark:text-white font-semibold">{item.username}</span>
										</div>
										<span
											className="text-black dark:text-white"
											style={{ wordBreak: "break-word", fontSize: "12px" }}
										>
											{item.message}
										</span>
									</div>
								</div>
							)} */}
							{/* //image */}
							{direction === "right" && (
								<div style={{ marginLeft: "8px" }}>
									<img
										className="w-10 h-10 rounded-full"
										alt="profile"
										src={`https://unavatar.now.sh/${item ? item.username : "kikobeats"}`}
									/>
								</div>
							)}
						</div>
					);
				})}
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					padding: "16px",
					borderTop: "1px solid rgba(0, 0, 0, 0.13)",
				}}
			>
				<div style={{ flex: "1 1 0", maxWidth: "100%" }}>
					<input
						onChange={handleInput}
						value={input}
						onKeyPress={(event) => {
							if (event.key === "Enter") {
								event.preventDefault();
								sendMessage();
							}
						}}
						className="focus:ring-1 dark:text-white shadow focus:outline-none w-full text-sm bg-white dark:bg-dark-500 border-transparent-100 text-black placeholder-gray-500 border  py-2 px-3 appearance-none border rounded  py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						placeholder="type your message"
					/>
				</div>
				{/* <Separator variant="horizontal" size="12" />
				<div
					style={{
						border: "1px solid rgba(0, 0, 0, 0.13)",
						width: "40px",
						padding: "6px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "50%",
						backgroundColor: "#28A745",
					}}
				>
					<SendIcon style={{ fontSize: "24px", color: "white" }} />
				</div> */}
			</div>
		</>
	);
};

export default MessagePanel;
