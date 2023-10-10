import React, { useReducer } from 'react';
import {
	// handleCardDragOver,
	handleDragOver,
	handleDragStart,
	// handleOnDrag,
	// handleOnDragStart,
	// handleDrop,
	handleTempCardDrag,
	handleTempCardDragEnd
} from './utils/custom-drag-handler';

// const blueItems = Array.from({ length: 5 }, (_, idx) => idx);
// const greenItems = Array.from({ length: 5 }, (_, idx) => idx + 5);
export type KanbanBoardKeys = 'backlog' | 'in-progress';
type KanbanState = {
	[k in KanbanBoardKeys]: number[];
};

const enum KanbanDispathType {
	UPDATE_BACKLOG,
	UPDATE_IN_PROGRESS
}
interface KanbanAction {
	type: KanbanDispathType;
	payload: number[];
}
// Create a reducer function
const kanbanReducer = (state: KanbanState, action: KanbanAction): KanbanState => {
	switch (action.type) {
		case KanbanDispathType.UPDATE_BACKLOG:
			return {
				...state,
				backlog: action.payload
			};
		case KanbanDispathType.UPDATE_IN_PROGRESS:
			return {
				...state,
				'in-progress': action.payload
			};
		default:
			return state;
	}
};

function App() {
	// Initial state
	const initialState: KanbanState = {
		backlog: Array.from({ length: 5 }, (_, idx) => idx),
		'in-progress': Array.from({ length: 5 }, (_, idx) => idx + 5)
	};

	// useReducer hook
	const [kanbanData, dispatch] = useReducer(kanbanReducer, initialState);

	// const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
	// const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

	// const handleDragEndCleanUp = () => {
	// 	setDraggedIndex(null);
	// 	setDragOverIndex(null);
	// };

	const handleCardDragLogic = (cont: KanbanBoardKeys, a: string, b: string) => {
		// const aa = kanbanData[cont].indexOf(Number(a));
		const bb = kanbanData[cont].indexOf(Number(b));

		console.log('Container: ', cont);
		console.log('a: ', a);
		console.log('b: ', b);

		const tempCopy = kanbanData[cont];
		const final = tempCopy.filter((el) => el !== Number(a));
		console.log('part a:', final);
		console.log('index bb:', bb);
		final.splice(bb, 0, Number(a));

		console.log('Formatted ans: ', final);
		console.log('Dispatching: ', {
			type:
				cont === 'backlog'
					? KanbanDispathType.UPDATE_BACKLOG
					: KanbanDispathType.UPDATE_IN_PROGRESS,
			payload: final
		});

		dispatch({
			type:
				cont === 'backlog'
					? KanbanDispathType.UPDATE_BACKLOG
					: KanbanDispathType.UPDATE_IN_PROGRESS,
			payload: final
		});

		// Cleanaup
		// handleDragEndCleanUp();
	};

	return (
		<React.Fragment>
			<h1 className="py-4 text-center">Welcome to Superpower Kanban</h1>
			<div
				draggable="true"
				// onDragStart={handleDragStart}
				// onDrop={handleDrop}
				className="draggable m-auto flex w-fit bg-yellow-500 p-2"
			>
				Drag Me
			</div>
			<div className="flex flex-row">
				<div
					className="m-10 h-full flex-1 bg-blue-500"
					id="container-a"
					data-sk-cont={'backlog'}
					data-sk-cont-idx={0}
					// draggable={true}
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
					// onDragEnd={handleDrop}
					// onDrop={handleDrop}
					onDrag={handleTempCardDrag}
					onDragEnd={(e: React.DragEvent<HTMLDivElement>) => {
						handleTempCardDragEnd(e, (cont: KanbanBoardKeys, a: string, b: string) =>
							handleCardDragLogic(cont, a, b)
						);
					}}
				>
					{kanbanData.backlog.map((el) => (
						<div
							draggable={true}
							className="relative flex cursor-pointer items-center justify-center bg-transparent px-2 py-4 opacity-100"
							key={el}
							data-id={el}
							// onDrag={handleTempCardDrag}
							// onDragEnd={handleTempCardDragEnd}
						>
							<div className="flex-1 bg-white py-2 text-center">{el}</div>
						</div>
					))}
				</div>
				<div
					className="m-10 h-full flex-1 bg-green-500"
					id="container-b"
					data-sk-cont={'in-progress'}
					data-sk-cont-idx={1}
					// draggable={true}
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
					// onDragEnd={handleDrop}
					// onDrop={handleDrop}
					onDrag={handleTempCardDrag}
					onDragEnd={(e: React.DragEvent<HTMLDivElement>) => {
						handleTempCardDragEnd(e, (cont: KanbanBoardKeys, a: string, b: string) =>
							handleCardDragLogic(cont, a, b)
						);
					}}
				>
					{kanbanData['in-progress'].map((el) => (
						<div
							draggable={true}
							className="relative flex cursor-pointer items-center justify-center bg-transparent px-2 py-4 opacity-100"
							key={el}
							data-id={el}
							// onDrag={handleTempCardDrag}
							// onDragEnd={handleTempCardDragEnd}
						>
							<div className="flex-1 bg-white py-2 text-center">{el}</div>
						</div>
					))}
				</div>
			</div>

			{/* <div className="drag-container mb-5" onDragStart={handleOnDragStart} onDrag={handleOnDrag}>
				{[1, 2, 3, 4, 5].map((el) => (
					<div draggable={true} className="draggable" key={el}>
						{el}
					</div>
				))}
			</div> */}
			<button
				className="btn m-auto flex bg-indigo-500 p-4"
				onClick={() => {
					console.log('KanbanData: ', kanbanData);
				}}
			>
				Show Data
			</button>
		</React.Fragment>
	);
}

export default App;
