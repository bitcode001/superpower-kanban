import { DragEventHandler } from 'react';

export const handleDragStart: DragEventHandler<HTMLDivElement> = (
	e: React.DragEvent<HTMLDivElement>
) => {
	e.stopPropagation();
	console.log('Drag start: ', e.target);
};

export const handleDragOver: DragEventHandler<HTMLDivElement> = (
	e: React.DragEvent<HTMLDivElement>
) => {
	e.stopPropagation();
	e.preventDefault();
	console.log('Drag over: ', e);
};

export const handleDrop: DragEventHandler<HTMLDivElement> = (
	e: React.DragEvent<HTMLDivElement>
) => {
	e.stopPropagation();
	e.preventDefault();
	console.log('Drop : ', e);
};

export const handleTempCardDrag: DragEventHandler<HTMLDivElement> = (
	e: React.DragEvent<HTMLDivElement>
) => {
	//   e.stopPropagation();
	const delegatedEl = e.target as HTMLElement;
	if (delegatedEl.classList.contains('opacity-100')) {
		delegatedEl.classList.remove('opacity-100');
		delegatedEl.classList.add('opacity-50');
	}
	//   console.log("e current target: ", e.currentTarget);
	//   console.log("e target: ", (e.target as HTMLElement).classList);
	//   console.log("Card e: ");
};

export const handleTempCardDragEnd: DragEventHandler<HTMLDivElement> = (
	e: React.DragEvent<HTMLDivElement>
) => {
	//   e.stopPropagation();
	const delegatedEl = e.target as HTMLElement;
	if (delegatedEl.classList.contains('opacity-50')) {
		delegatedEl.classList.remove('opacity-50');
		delegatedEl.classList.add('opacity-100');
	}
	//   console.log("Card e: ");
};
