// #f7f8f9

// (() => {
// const sections = document.querySelectorAll('.s-kan-container');
// sections.forEach((el) => {
// 	const childrens: HTMLElement[] = Array.prototype.slice.call(el.children);
// 	const totalMinHeight = childrens.reduce(
// 		(acc, cv) => (acc += cv.getBoundingClientRect().height),
// 		0
// 	);

// 	(el as HTMLElement).style.minHeight = `${totalMinHeight}px`;
// 	(el as HTMLElement).style.backgroundColor = '#f4f5f7';
// });
// })();

// document.getElementsByClassName('s-kan-container').bind('dragover', function () {
// 	document.body.classList.add('dragging');
// });
// document.getElementsByClassName('s-kan-container').bind('dragleave', function () {
// 	document.body.classList.remove('dragging');
// });
