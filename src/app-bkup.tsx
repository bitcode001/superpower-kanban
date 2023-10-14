// import './utils/pre-req-drag';
import React, { useReducer } from 'react';
import {
	handleDragStart,
	// handleMouseDown,
	// handleMouseMove,
	// handleMouseUp,
	handleTempCardDrag,
	handleTempCardDragEnd
} from './utils/custom-drag-handler';
import { handleMouseDown, handleMouseUp } from './utils/custom-mouse-drag-handler';

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

	const transparentImage = new Image();
	transparentImage.src =
		'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAICTAEAOw==';
	// 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

	const handleCustomDragStart = (e: React.DragEvent<HTMLDivElement>) => {
		// Hides the trailing item placeholder image
		// transparentImage.onloadstart = () => console.log('loading custom image');
		e.dataTransfer.setDragImage(transparentImage, 20000, 20000);
		// transparentImage.onload = () => {
		// 	console.log('Set new placeholder');
		// };
		// e.dataTransfer.setDragImage(transparentImage, 0, 0);
		handleDragStart(e);
	};

	React.useEffect(() => {
		const sections = document.querySelectorAll('.s-kan-container');
		sections.forEach((el) => {
			const childrens: HTMLElement[] = Array.prototype.slice.call(el.children);
			const totalMinHeight = childrens.reduce(
				(acc, cv) => (acc += cv.getBoundingClientRect().height),
				0
			);

			(el as HTMLElement).style.minHeight = `${totalMinHeight}px`;
			// (el as HTMLElement).style.backgroundColor = '#f4f5f7';

			// Set default absolute position
			let offsetFromTop = 0;
			childrens.forEach((el) => {
				el.style.top = `${offsetFromTop}px`;

				offsetFromTop += el.getBoundingClientRect().height;
			});
		});
	}, []);

	return (
		<React.Fragment>
			<h1 className="py-4 text-center">Welcome to Superpower Kanban</h1>
			<div
				draggable="true"
				// onDragStart={handleCustomDragStart}
				// onDragEnd={handleTempCardDragEnd}
				// onDrop={handleDrop}
				className="draggable m-auto flex w-fit bg-yellow-500 p-2"
			>
				Drag Me
			</div>

			<div
				className="outer-wrapper m-4 flex flex-col px-1"
				style={{
					// backgroundColor: '#F4F5F7',
					backgroundColor: 'pink',
					borderRadius: '6px',
					position: 'relative',
					alignSelf: 'stretch',
					flex: '1 1 auto',
					transition: 'opacity 0.2s ease 0s, min-width 300ms ease 0s, max-width 300ms ease-in 0s',
					minWidth: '300px',
					maxWidth: '300px'
				}}
			>
				<p className="p-2 text-center">Backlog - </p>
				<div className="s-kan-spacer m-1">
					<div
						className="s-kan-container relative flex flex-col"
						id="container-a"
						data-sk-cont={'backlog'}
						data-sk-cont-idx={0}
						// draggable={true}
						// onDragStart={handleCustomDragStart}
						// onDrag={handleTempCardDrag}
						// onDragEnd={(e: React.DragEvent<HTMLDivElement>) => {
						// 	handleTempCardDragEnd(e, (cont: KanbanBoardKeys, a: string, b: string) =>
						// 		handleCardDragLogic(cont, a, b)
						// 	);
						// }}
						onMouseDownCapture={handleMouseDown}
						onMouseUp={handleMouseUp}
						// onMouseDown={handleMouseDown}
						draggable={false}
					>
						{kanbanData.backlog.map((el) => (
							<div className="s-kan-item-wrapper absolute w-full" key={el}>
								<div
									className="relative box-border flex w-full cursor-pointer flex-col items-center justify-center bg-transparent text-center opacity-100 transition-all"
									data-id={el}
									// onDrag={handleTempCardDrag}
									// onDragEnd={handleTempCardDragEnd}
								>
									<div className="h-1 w-full"></div>
									<div
										className="my-0.5 w-full"
										// style={{
										// 	boxShadow:
										// 		'0px 1px 1px #091E4240, 0px 0px 1px #091E424F,0 1px 1px rgba(23,43,77,0.2),0 0 1px rgba(23,43,77,0.2)'
										// }}
									>
										<div className="bg-white p-2">{el}</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="flex flex-row py-4">
				<div
					className="m-10 h-full flex-1 bg-green-500"
					id="container-b"
					data-sk-cont={'in-progress'}
					data-sk-cont-idx={1}
					draggable={true}
					onDragStart={handleCustomDragStart}
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
							className="relative flex cursor-pointer items-center justify-center bg-transparent px-2 py-4 opacity-100 transition-all"
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

			<div className="s-kanban-ghost"></div>

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
