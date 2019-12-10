export const tagsParser = str => str.split(',');

export function debounce(f, wait, immediate) {
	let timeout;
		return (...args) => {
			const context = this;
			const later = () => {
				timeout = null;
				if (!immediate) f.apply(context, args);
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
 }
