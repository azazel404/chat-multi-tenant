import React from "react";

export default function card(props) {
	return (
		<div className="bg-white dark:bg-dark-500 p-4 rounded-2xl text-sm tracking-wide mb-4 shadow-lg">
			{props.children}
		</div>
	);
}
