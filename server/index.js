const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");
const {
	userJoinRoom,
	getCurrentUser,
	userLeaveRoom,
	getRoomUsers,
	formatMessage,
} = require("./helpers/userManage");

const port = 8080;

const cors = require("cors");

app.use(cors());
app.options("*", cors());

//dynamic workspaces
const workspaces = io.of(/^\/\w+$/);

// this middleware will be assigned to each namespace
workspaces.use((socket, next) => {
	// ensure the user has access to the workspace
	next();
});

workspaces.on("connection", (socket) => {
	//variable handle workspace
	const workspace = socket.nsp;

	socket.on("user:joinRoom", (data) => {
		const user = userJoinRoom(socket.id, data.username, data.room);
		socket.join(user.room);

		// socket.broadcast
		// 	.to(user.room)
		// 	.emit("user:message", formatMessage(`${user.username} has joined the chat`));

		workspace.to(user.room).emit("user:roomUsers", {
			room: user.room,
			users: getRoomUsers(user.room),
		});
	});

	//socket message
	socket.on("user:sendMessage", (msg) => {
		const user = getCurrentUser(socket.id);
		workspace.to(user.room).emit("user:message", formatMessage(user.username, msg, uuidv4()));
	});

	//socket disconnect
	socket.on("disconnect", () => {
		const user = userLeaveRoom(socket.id);

		if (user) {
			// Send users and room info
			workspaces.to(user.room).emit("roomUsers", {
				room: user.room,
				users: getRoomUsers(user.room),
			});
		}
	});
});

server.listen(port, () => console.log("server running on port:" + port));
