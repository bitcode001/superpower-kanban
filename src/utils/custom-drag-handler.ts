import { KanbanBoardKeys } from '@/App';
// import { DragEventHandler } from 'react';

let item_getting_dragged: HTMLElement | null;
let hoverOnRef: Element | null;
type CordType = {
	x: number;
	y: number;
};
let initCord: CordType = { x: 0, y: 0 };

export const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
	// e.stopPropagation();
	// e.preventDefault();
	console.log('Drag start: ', e.target);
	const delegatedEl = e.target as HTMLElement;
	if (delegatedEl.classList.contains('opacity-100')) {
		delegatedEl.classList.remove('opacity-100');
		delegatedEl.classList.add('opacity-0');
		delegatedEl.classList.add('grabbing-icon');
	}
	// document.body.classList.add('grabbing-icon');

	// Initial coord
	initCord = {
		x: e.pageX,
		y: e.pageY
	};
	// e.dataTransfer.effectAllowed = 'all';
	// e.dataTransfer.

	// document.body.classList.add('grabbing-icon');
	// delegatedEl.classList.add('grabbing-icon');

	// Clone the node and set it for custom overlay
	const clonnedNode = (e.target as HTMLElement).cloneNode(true);
	// position: fixed; top: 302px; left: 65px; box-sizing: border-box; width: 260px; height: 84.7969px; transition: opacity 0.2s cubic-bezier(0.2, 0, 0, 1) 0s; z-index: 5000; pointer-events: none; transform: translate(35px, 24px);
	(clonnedNode as HTMLElement).setAttribute(
		'style',
		`position: fixed; top: ${(e.target as HTMLElement).getBoundingClientRect().top}px; left: ${
			(e.target as HTMLElement).getBoundingClientRect().left
		}px; box-sizing: border-box; background-color: red; opacity: 1; width: ${
			(e.target as HTMLElement).getBoundingClientRect().width
		}px; height: max-content; transition: cubic-bezier(0.2, 0, 0, 1) 0.1s; z-index: 5000; pointer-events: none;`
	);
	(clonnedNode as HTMLElement).classList.add('s-kanban-ghost-child');
	(clonnedNode as HTMLElement).classList.add('grabbing-icon');
	document.querySelector('.s-kanban-ghost')?.appendChild(clonnedNode);

	// item_getting_dragged = document.elementFromPoint(e.pageX, e.pageY);
	item_getting_dragged = e.target as HTMLElement;

	let totalItemHeight: number = 0;
	for (let i = 0; i < e.currentTarget.children.length; i++) {
		totalItemHeight += Number(e.currentTarget.children[i].getBoundingClientRect().height);
	}
	console.log('Possible cont height: ', totalItemHeight);
	// e.currentTarget.setAttribute('style', `min-height: ${totalItemHeight}px`);
};

// export const handleDragOver: DragEventHandler<HTMLDivElement> = (
// 	e: React.DragEvent<HTMLDivElement>
// ) => {
// 	// e.stopPropagation();
// 	// e.preventDefault();
// };

export const handleTempCardDrag: (e: React.DragEvent<HTMLDivElement>) => void = (e) => {
	// e.stopPropagation();
	// e.preventDefault();

	// Add trailing element
	const trail = document.querySelector('.s-kanban-ghost-child');
	if (trail) {
		// trail.animate(
		// 	{
		// 		left: `${e.pageX - trail.getBoundingClientRect().height / 2}px`,
		// 		top: `${e.pageY - trail.getBoundingClientRect().width / 2}px`
		// 	},
		// 	{ duration: 0, fill: 'forwards' }
		// );
		if (e.pageX == 0 && e.pageY == 0) {
			// console.log('X: ' + (e.pageX - initCord.x) + ' Y: ' + (e.pageY - initCord.y));
			// console.log('initX: ' + initCord.x + ' initY: ' + initCord.y);
			(trail as HTMLElement).style.transform = `translate(0, 0) scale(1)`;
		} else {
			(trail as HTMLElement).style.transform = `translate(${e.pageX - initCord.x}px, ${
				e.pageY - initCord.y
			}px) scale(1.01) rotate(2deg)`;
		}
	}

	e.dataTransfer.effectAllowed = 'move';

	// Get items from the current mouse position
	const hoverOnItem = document.elementFromPoint(e.pageX, e.pageY);

	// Safety check gate
	if (
		hoverOnItem !== null &&
		hoverOnItem !== e.target &&
		hoverOnItem.parentNode === e.currentTarget
	) {
		// Get bounding client rect of that box
		const hoveredOnItem = hoverOnItem.getBoundingClientRect();

		// Calculate the overlapping space between the div I am draggin against the div I am hovering on
		if (e.pageY > hoveredOnItem.top + hoveredOnItem.height / 2) {
			// console.log('hover on item: ', hoverOnItem);
			if (hoverOnRef !== hoverOnItem) {
				const childLists: HTMLElement[] = Array.prototype.slice.call(
					e.currentTarget.children
				) as HTMLElement[];
				const myHoveredIndex = childLists.indexOf(hoverOnItem as HTMLElement);
				const grabbedIndex = childLists.indexOf(item_getting_dragged as HTMLElement);

				let deltaY: 'down' | 'up' | 'still';
				if (grabbedIndex < myHoveredIndex) {
					deltaY = 'down';
				} else if (grabbedIndex > myHoveredIndex) {
					deltaY = 'up';
				} else if (grabbedIndex === myHoveredIndex) {
					deltaY = 'still';
				} else {
					deltaY = 'down';
				}

				// console.log('Swap space');
				// console.log('dletaY:', deltaY);
				// console.log('grabbed index:', grabbedIndex);
				// console.log('hovered index:', myHoveredIndex);

				// console.log('diff: ', item_getting_dragged?.y, hoveredOnItem.y);
				// console.log('delta Y: ', e.clientY);

				// cleanup stale property element
				childLists.map((el) => el.removeAttribute('style'));

				if (deltaY === 'up')
					childLists.slice(myHoveredIndex, grabbedIndex).map((el) =>
						// !el.getAttribute('style') &&
						el.setAttribute(
							'style',
							`transform: translateY(${el.getBoundingClientRect().height}px)`
						)
					);

				if (deltaY === 'down')
					childLists.slice(grabbedIndex, myHoveredIndex + 1).map((el, idx) => {
						// !el.getAttribute('style') &&
						el.getAttribute('style') && el.removeAttribute('style');
						idx > 0 &&
							el.setAttribute(
								'style',
								`transform: translateY(-${el.getBoundingClientRect().height}px)`
							);
					});

				// if (deltaY === 'still') childLists.map((el) => el.removeAttribute('style'));
			} else {
				// If user keep on hovering on same item
			}

			hoverOnRef = hoverOnItem;
		}
	}

	if (hoverOnItem === e.target) {
		// console.log('I am hovering myself');
		// (Array.prototype.slice.call(e.currentTarget.children) as HTMLElement[]).map((el) =>
		// 	el.removeAttribute('style')
		// );
	}
};

export const handleTempCardDragEnd: (
	e: React.DragEvent<HTMLDivElement>,
	cb: (cont: KanbanBoardKeys, a: string, b: string) => void
) => void = (e, cb) => {
	// e.stopPropagation();
	// e.preventDefault();

	const delegatedEl = e.target as HTMLElement;
	if (delegatedEl.classList.contains('opacity-0')) {
		delegatedEl.classList.remove('opacity-0');
		delegatedEl.classList.add('opacity-100');
		delegatedEl.classList.remove('grabbing-icon');
	}
	// document.body.classList.remove('grabbing-icon');
	// delegatedEl.classList.add('grabbing-icon');
	console.log('Drag ended!');

	// Get the container
	const container = e.currentTarget;
	const container_key = (container.getAttribute('data-sk-cont') as KanbanBoardKeys) ?? 'backlog';

	// Remove transition
	// for (let i = 0; i < e.currentTarget.children.length; i++) {
	// 	e.currentTarget.children[i].classList.remove('transition-all');
	// 	container.children[i].removeAttribute('style');
	// }

	// Removing grabbed icon
	// if (item_getting_dragged) item_getting_dragged.classList.add('cursor-pointer');
	// document.querySelector('.s-kanban-ghost')?.appendChild(clonnedNode);

	(() => {
		const container = document.querySelector('.s-kanban-ghost');
		while (container?.firstChild) {
			container.removeChild(container.firstChild);
		}
	})();
	// initCord = originalPos = resetPos;
	// document.body.classList.toggle('grabbing-icon');

	if (hoverOnRef) {
		// console.log('THROW: ', hoverOnRef);
		cb(
			container_key,
			(e.target as HTMLElement).getAttribute('data-id') ?? '0',
			hoverOnRef.getAttribute('data-id') ?? '0'
		);
	}

	hoverOnRef = null;
	item_getting_dragged = null;
};

// export const handleMouseDown = (e: React.MouseEvent) => {
// 	console.log('Mouse Down: ', e);
// };

// export const handleMouseUp = (e: React.MouseEvent) => {
// 	console.log('Mouse Up: ', e);
// };

// export const handleMouseMove = (e: React.MouseEvent) => {
// console.log('Mouse Move: ', e);
// };
