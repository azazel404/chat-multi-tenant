import * as React from "react";

const ListItem = (props) => {
	return (
		<div className="flex flex-row py-4 text-sm text-black dark:text-white">
			<div className="font-semibold mb-1">{props.title}</div>
			{props.action ? (
				<>
					<div className="flex-1" />
					{props.action}
				</>
			) : null}
		</div>
	);
};

export default ListItem;
