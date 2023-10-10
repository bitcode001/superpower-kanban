import { KanbanBoardKeys } from '@/App';
import { DragEventHandler } from 'react';

let item_getting_dragged: HTMLElement | null;
let hoverOnRef: Element | null;

export const handleDragStart: DragEventHandler<HTMLDivElement> = (
	e: React.DragEvent<HTMLDivElement>
) => {
	e.stopPropagation();
	// console.log('Drag start: ', e.target);

	// item_getting_dragged = document.elementFromPoint(e.pageX, e.pageY);
	item_getting_dragged = e.target as HTMLElement;

	e.currentTarget.classList.add('grabbing-icon');

	for (let i = 0; i < e.currentTarget.children.length; i++) {
		e.currentTarget.children[i].classList.add('transition-all');
	}
};

export const handleDragOver: DragEventHandler<HTMLDivElement> = (
	e: React.DragEvent<HTMLDivElement>
) => {
	e.stopPropagation();
	e.preventDefault();
};

export const handleDrop: DragEventHandler<HTMLDivElement> = (
	e: React.DragEvent<HTMLDivElement>
) => {
	e.stopPropagation();
	e.preventDefault();
	console.log('Dropped : ', e.target);
};

export const handleTempCardDrag: (e: React.DragEvent<HTMLDivElement>) => void = (e) => {
	e.stopPropagation();
	e.preventDefault();
	const delegatedEl = e.target as HTMLElement;
	if (delegatedEl.classList.contains('opacity-100')) {
		delegatedEl.classList.remove('opacity-100');
		delegatedEl.classList.add('opacity-0');
	}

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
	e.stopPropagation();
	const delegatedEl = e.target as HTMLElement;
	if (delegatedEl.classList.contains('opacity-0')) {
		delegatedEl.classList.remove('opacity-0');
		delegatedEl.classList.add('opacity-100');
	}

	// Get the container
	const container = e.currentTarget;
	const container_key = (container.getAttribute('data-sk-cont') as KanbanBoardKeys) ?? 'backlog';

	// Remove transition
	for (let i = 0; i < e.currentTarget.children.length; i++) {
		e.currentTarget.children[i].classList.remove('transition-all');
		container.children[i].removeAttribute('style');
	}

	// Removing grabbed icon
	if (item_getting_dragged) item_getting_dragged.classList.add('cursor-pointer');

	document.body.classList.remove('grabbing-icon');

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

export const handleCardDragOver: DragEventHandler<HTMLDivElement> = (
	e: React.DragEvent<HTMLDivElement>
) => {
	// To prevent event bubbling
	e.stopPropagation();
	// To Allow to be dropped
	e.preventDefault();
	console.log('Drag over: ', e.target);
};

// NEW TEST
export const handleOnDrag = (e: React.DragEvent) => {
	e.stopPropagation();
	// console.log('e.target: ', e.target);
};

export const handleOnDragStart = (e: React.DragEvent) => {
	e.stopPropagation();
	console.log('e.target: ', e.target);
};
