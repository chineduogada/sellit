/**
 * @function
 * formats an `ISOString` date into `yyyy-mm-dd.hh:mm:ss` date
 *
 * @params {string} ISOString.
 * @returns a `date` as a `string` in `yyyy-mm-dd.hh:mm:ss` date format.
 *
 * @example
 * const date = formatDate(new Date().toISOString());
 */
const formatDate = (ISOString) => {
	let date = new Date(ISOString);

	const prependZero = (num) => {
		console.log(`${num}`.length > 1);

		if (`${num}`.length > 1) return num;

		return `0${num}`;
	};

	const year = date.getFullYear();
	const month = prependZero(date.getMonth());
	const day = prependZero(date.getDay());
	const hours = prependZero(date.getHours());
	const minutes = prependZero(date.getMinutes());
	const seconds = prependZero(date.getSeconds());

	date = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

	return date;
};

export default formatDate;

