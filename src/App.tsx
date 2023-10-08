import React from 'react';
import {
	// handleDragOver,
	handleDragStart,
	handleDrop,
	handleTempCardDrag,
	handleTempCardDragEnd
} from './utils/custom-drag-handler';

const blueItems = Array.from({ length: 5 }, (_, idx) => idx);
const greenItems = Array.from({ length: 5 }, (_, idx) => idx + 5);

function App() {
	return (
		<React.Fragment>
			<h1>Welcome to Superpower Kanban</h1>
			<div
				draggable="true"
				onDragStart={handleDragStart}
				className="draggable h-10 w-10 bg-yellow-500"
			></div>
			<div className="flex flex-row">
				<div
					className="m-10 h-full flex-1 bg-blue-500"
					id="container-a"
					// onDragOver={handleDragOver}
					// onDragEnd={handleDrop}
					onDrop={handleDrop}
					onDrag={handleTempCardDrag}
					onDragEnd={handleTempCardDragEnd}
				>
					{blueItems.map((el) => (
						<div
							draggable={true}
							className="m-2 flex h-10 flex-1 items-center justify-center bg-white py-4 opacity-100 transition-all"
							key={el}
							// onDrag={handleTempCardDrag}
							// onDragEnd={handleTempCardDragEnd}
						>
							{el}
						</div>
					))}
				</div>
				<div
					className="m-10 h-full flex-1 bg-green-500"
					id="container-b"
					// draggable={true}
					// onDragOver={handleDragOver}
					// onDragEnd={handleDrop}
					onDrop={handleDrop}
					onDrag={handleTempCardDrag}
					onDragEnd={handleTempCardDragEnd}
				>
					{greenItems.map((el) => (
						<div
							draggable={true}
							className="m-2 flex h-10 flex-1 items-center justify-center bg-white py-4 opacity-100 transition-all"
							key={el}
							// onDrag={handleTempCardDrag}
							// onDragEnd={handleTempCardDragEnd}
						>
							{el}
						</div>
					))}
				</div>
			</div>
		</React.Fragment>
	);
}

export default App;
