/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

const data = [
	{
		draggableId: '1',
		dragIndex: '0',
		testId: '1',
		ariaLabel: 'BMO quote Sometimes life is scary and dark',
		imgAlt: 'BMO',
		quote: 'Sometimes life is scary and dark',
		character: 'BMO',
		id: '1'
	},
	{
		draggableId: '2',
		dragIndex: '1',
		testId: '2',
		ariaLabel:
			'Jake quote Sucking at something is the first step towards being sorta good at something.',
		imgAlt: 'Jake',
		quote: 'Sucking at something is the first step towards being sorta good at something.',
		character: 'Jake',
		id: '2'
	},
	{
		draggableId: '3',
		dragIndex: '2',
		testId: '3',
		ariaLabel: "Jake quote You got to focus on what's real, man",
		imgAlt: 'Jake',
		quote: "You got to focus on what's real, man",
		character: 'Jake',
		id: '3'
	},
	{
		draggableId: '4',
		dragIndex: '3',
		testId: '4',
		ariaLabel: 'Finn quote Is that where creativity comes from? From sad biz?',
		imgAlt: 'Finn',
		quote: 'Is that where creativity comes from? From sad biz?',
		character: 'Finn',
		id: '4'
	},
	{
		draggableId: '5',
		testId: '5',
		dragIndex: '4',
		ariaLabel: 'Finn quote Homies help homies. Always',
		imgAlt: 'Finn',
		quote: 'Homies help homies. Always',
		character: 'Finn',
		id: '5'
	},
	{
		draggableId: '6',
		dragIndex: '5',
		testId: '6',
		ariaLabel: 'Princess bubblegum quote Responsibility demands sacrifice',
		imgAlt: 'Princess bubblegum',
		quote: 'Responsibility demands sacrifice',
		character: 'Princess bubblegum',
		id: '6'
	},
	{
		draggableId: '7',
		dragIndex: '6',
		testId: '7',
		ariaLabel:
			"Princess bubblegum quote That's it! The answer was so simple, I was too smart to see it!",
		imgAlt: 'Princess bubblegum',
		quote: "That's it! The answer was so simple, I was too smart to see it!",
		character: 'Princess bubblegum',
		id: '7'
	},
	{
		draggableId: '8',
		dragIndex: '7',
		testId: '8',
		ariaLabel:
			"Finn quote People make mistakes. It's all a part of growing up and you never really stop growing",
		imgAlt: 'Finn',
		quote: "People make mistakes. It's all a part of growing up and you never really stop growing",
		character: 'Finn',
		id: '8'
	},
	{
		draggableId: '9',
		dragIndex: '8',
		testId: '9',
		ariaLabel: "Finn quote Don't you always call sweatpants 'give up on life pants,' Jake?",
		imgAlt: 'Finn',
		quote: "Don't you always call sweatpants 'give up on life pants,' Jake?",
		character: 'Finn',
		id: '9'
	},
	{
		draggableId: '10',
		dragIndex: '9',
		testId: '10',
		ariaLabel: 'Princess bubblegum quote I should not have drunk that much tea!',
		imgAlt: 'Princess bubblegum',
		quote: 'I should not have drunk that much tea!',
		character: 'Princess bubblegum',
		id: '10'
	},
	{
		draggableId: '11',
		dragIndex: '10',
		testId: '11',
		ariaLabel: 'Princess bubblegum quote Please! I need the real you!',
		imgAlt: 'Princess bubblegum',
		quote: 'Please! I need the real you!',
		character: 'Princess bubblegum',
		id: '11'
	},
	{
		draggableId: '12',
		dragIndex: '11',
		testId: '12',
		ariaLabel: "Princess bubblegum quote Haven't slept for a solid 83 hours, but, yeah, I'm good.",
		imgAlt: 'Princess bubblegum',
		quote: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
		character: 'Princess bubblegum',
		id: '12'
	}
];

let mouseInit = { x: 0, y: 0 };
let draggableSiblings: HTMLElement[];
let draggingDOM: HTMLElement;
let firstDrag = false;

function App() {
	// const [mouseInit, setMouseInit] = React.useState({
	// 	x: 0,
	// 	y: 0
	// });
	const handleMouseMove = (e: MouseEvent) => {
		// Simple pseudocode
		// step 1 - first grab the index of clicked (selected/grabbed) valid DOM
		// step 2 - style all the siblings below the selected index to shift by the height of selected dom (on first hover)
		// step 3 - if hovered outside of the parent wrapper then reset all the style of siblings (delete style attribute)
		// step 4 - now if hovered item have 'style' property then purge it / if not add style to all the elements from hovered till the end. DOT

		// Step 1
		// Update dragging dom
		if (draggingDOM) {
			// console.log('Setting values: ', draggingDOM.getBoundingClientRect());
			draggingDOM.setAttribute(
				'style',
				`position: absolute; width: ${draggingDOM.getBoundingClientRect().width}px; height: ${
					draggingDOM.getBoundingClientRect().height
				}px ; box-sizing: border-box; transition: opacity 0.2s cubic-bezier(0.2, 0, 0, 1) 0s; z-index: 5000; pointer-events: none; transform: translate(${
					e.pageX - mouseInit.x
				}px, ${e.pageY - mouseInit.y}px);`
			);
		}

		// Step 2
		// Shift all siblings except the one grabbing and above
		if (draggableSiblings && firstDrag) {
			const myIndex = draggingDOM.getAttribute('data-rbd-draggable-index');
			draggableSiblings.forEach((el, idx) => {
				if (idx > Number(myIndex)) {
					el.setAttribute(
						'style',
						`transform: translate(0px, ${
							draggingDOM.getBoundingClientRect().height
						}px); transition: none 0s ease 0s;`
					);
				}
			});
			firstDrag = false;
		}

		// Find which element I am hovering now
		const currentHover = document.elementFromPoint(e.pageX, e.pageY);
		if (currentHover) {
			const flag = currentHover.getAttribute('data-moveable');

			// Step 3: If I am not hovering on the container; I reset the style of all sibings
			if (
				!(currentHover.parentNode as HTMLElement).getAttribute('id')?.includes('sibling-wrapper') &&
				!currentHover.getAttribute('id')?.includes('sibling-wrapper')
			) {
				draggableSiblings.forEach((el) => {
					if (el !== draggingDOM) {
						el.removeAttribute('style');
					}
				});
			}

			// If I am hovering over right item
			if (flag) {
				/// Revoke style if swapped
				if (
					e.pageY >
					currentHover.getBoundingClientRect().top + currentHover.getBoundingClientRect().height / 3
				) {
					// If my cursor is at arond middle of the hovering valid div dimension then I swap
					const hoverAttr = currentHover.getAttribute('data-rbd-draggable-index');
					// const myAttr = draggingDOM.getAttribute('data-rbd-draggable-index');

					// Step 4: If the hovered item have style; purge it; else; style the hovered dom and all its immediate sibling to slide down
					if (currentHover.getAttribute('style')) {
						currentHover.removeAttribute('style');
					} else {
						draggableSiblings.slice(Number(hoverAttr)).forEach((el) => {
							el.setAttribute(
								'style',
								`transform: translate(0px, ${draggingDOM.getBoundingClientRect().height}px);`
							);
						});
					}
				}
			}
		}
	};

	const handleMouseDown = (e: MouseEvent) => {
		document.body.classList.toggle('grabbing-icon');
		const delegatedEl = e.target as HTMLElement;
		// delegatedEl.style.cursor = 'dragging';
		const flag = delegatedEl.getAttribute('data-moveable');

		if (flag) {
			// Update custom flag
			delegatedEl.setAttribute('data-is-dragging', 'true');
			// Set init mouse coord
			mouseInit = { x: e.pageX, y: e.pageY };
			// Set init flag
			firstDrag = true;
			// console.log('setting up: ', e.pageX, ' and ', e.pageY);
			delegatedEl.setAttribute('style', 'cursor: grabbing');
			// Add global event listener for mouse move
			document.addEventListener('mousemove', handleMouseMove);

			// Track reference
			// const inMemoRef = document.getElementById('sibling-wrapper');
			const inMemoRef = delegatedEl.parentElement?.children;
			if (inMemoRef) {
				// Set ref to wrapper of draggable childrens
				// siblingWrapper = inMemoRef;
				// Set ref to draggable childrens
				draggableSiblings = Array.prototype.slice.call(inMemoRef);
			}
			// Set draggin element ref
			draggingDOM = delegatedEl;
		}
	};
	const handleMouseUp = () => {
		document.body.classList.toggle('grabbing-icon');
		// const delegatedEl = document.querySelector('[data-is-dragging="true"]');

		if (draggingDOM) {
			// e..removeEventListener('mousemove', handleMouseMove);
			draggingDOM.removeAttribute('style');
			draggingDOM.setAttribute('data-is-dragging', 'false');
		}

		if (draggableSiblings) {
			draggableSiblings.forEach((el) => {
				el.removeAttribute('style');
			});
		}

		// remove transition if possible
		// if (draggableSiblings) {
		// 	draggableSiblings.forEach((el) => {
		// 		el.classList.remove('transition-all');
		// 	});
		// }

		// remove global event listener for mouse move
		document.removeEventListener('mousemove', handleMouseMove);
		console.log('Mouse Up el: ', draggingDOM?.getBoundingClientRect());

		// Cleanups
		draggableSiblings = [];
		mouseInit = { x: 0, y: 0 };
		// siblingWrapper = null;
		// draggingDOM = null;
	};
	React.useEffect(() => {
		document.addEventListener('mousedown', handleMouseDown);
		document.addEventListener('mouseup', handleMouseUp);

		// Set fixed height
		const sections = document.querySelectorAll('[data-rbd-fixed-height-container]');
		sections.forEach((el) => {
			const childrens: HTMLElement[] = Array.prototype.slice.call(el.children);
			const totalMinHeight = childrens.reduce(
				(acc, cv) => (acc += cv.getBoundingClientRect().height),
				0
			);
			(el as HTMLElement).style.minHeight = `${totalMinHeight}px`;
		});

		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
			document.removeEventListener('mouseup', handleMouseUp);
		};
	}, []);
	return (
		<React.Fragment>
			<div className="h-ui flex min-h-screen w-full items-center justify-center">
				{/* <h1>Now I am draggin !</h1> */}
				<div
					data-rbd-droppable-id="list"
					data-rbd-droppable-context-id="0"
					className="self-center"
					style={{
						backgroundColor: 'rgb(255, 235, 230)',
						display: 'flex',
						flexDirection: 'column',
						opacity: 'inherit',
						padding: '8px 8px 0px',
						border: '8px',
						transition: 'background-color 0.2s ease 0s, opacity 0.1s ease 0s',
						userSelect: 'none',
						width: '300px'
					}}
				>
					<div className="flex items-center justify-center">
						<div className="my-10 flex flex-col self-center bg-gray-100 p-2">
							{/* border-radius: 2px; border: 2px solid transparent; background-color: rgb(255, 255,
							255); box-shadow: none; box-sizing: border-box; padding: 8px; min-height: 40px;
							margin-bottom: 8px; user-select: none; color: rgb(9, 30, 66); display: flex; */}
							<div id="sibling-wrapper" data-rbd-fixed-height-container="0">
								{data.map((item, idx) => (
									<a
										key={idx}
										href="/"
										onClick={(e) => e.stopPropagation()}
										data-rbd-draggable-context-id="0"
										data-rbd-draggable-id={item.draggableId}
										data-rbd-draggable-index={item.dragIndex}
										tabIndex={0}
										role="button"
										aria-describedby="rbd-hidden-text-0-hidden-text-0"
										data-rbd-drag-handle-draggable-id={item.draggableId}
										data-rbd-drag-handle-context-id="0"
										draggable="false"
										data-is-dragging="false"
										data-moveable="true"
										data-testid={item.testId}
										aria-label={item.ariaLabel}
										className="moving-card min-h-10 flex cursor-grab select-none flex-col rounded-sm border-2 border-transparent bg-transparent"
									>
										<div className="h-full w-full bg-white p-2">
											<img
												src="https://picsum.photos/200/200"
												alt={item.imgAlt}
												className="mr-4 h-10 w-10 rounded-full"
											/>
											<div className="css-j30nls e1i6b1k83">
												<div className="css-8x6dak e1i6b1k84">{item.quote}</div>
												<div className="css-8lh52t e1i6b1k85">
													<small className="css-r1rhy5 e1i6b1k86">{item.character}</small>
													<small className="css-h5d6eo e1i6b1k87">id:{item.id}</small>
												</div>
											</div>
										</div>
										<div className="h-2"></div>
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default App;
