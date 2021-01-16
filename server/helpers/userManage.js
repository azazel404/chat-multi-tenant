const users = [];

function userJoinRoom(id, username, room) {
	const user = { id, username, room };

	users.push(user);

	return user;
}

function getCurrentUser(id) {
	let findUser = users.find((user) => user.id === id);
	return findUser;
}

function userLeaveRoom(id) {
	const index = users.findIndex((user) => user.id === id);

	if (index !== -1) {
		return users.splice(index, 1)[0];
	}
}

function getRoomUsers(room) {
	return users.filter((user) => user.room === room);
}

function formatMessage(username, message, id) {
	return {
		id,
		username,
		message,
		time: new Date(),
	};
}

module.exports = {
	userJoinRoom,
	getCurrentUser,
	userLeaveRoom,
	getRoomUsers,
	formatMessage,
};
