import moment from 'moment';
import transform from 'lodash/transform';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import map from 'lodash/map';
import isDate from 'lodash/isDate';

/**
 * Transforms a moment or array of moments to JS Dates
 * @memberOf module:addons/date
 * @param {moment|moment[]} obj - Moment or array of Moments
 * @return {Date|Date[]} A single date or array of dates
 */
export function transformMomentsToDate(obj) {
	if (moment.isMoment(obj)) {
		return obj.isValid() ? obj.toDate() : null;
	}
	if (isArray(obj)) {
		return map(obj, v => transformMomentsToDate(v));
	}
	if (isObject(obj)) {
		return transform(obj, (result, value, key) => {
			result[key] = transformMomentsToDate(value); // eslint-disable-line no-param-reassign
		}, {});
	}
	return obj;
}

/**
 * Transforms a date or array of dates to moments
 * @memberOf module:addons/date
 * @param {date|date[]} obj - Date or array of Dates
 * @return {moment|moment[]} A single moment or array of moments
 */
export function transformDatesToMoment(obj) {
	if (isDate(obj)) return moment(obj);
	if (isArray(obj)) {
		return map(obj, v => transformDatesToMoment(v));
	}
	if (isObject(obj)) {
		return transform(obj, (result, value, key) => {
			result[key] = transformDatesToMoment(value); // eslint-disable-line no-param-reassign
		}, {});
	}
	return obj;
}

/**
 * Formats a date to a predefined style
 * @memberOf module:addons/date
 * @method formatDate
 * @param {Date|moment} obj - The date or moment object
 * @param {string} [type=short] options.type - short, medium, or long
 * @param {bool} [time=false] options.time - If true, displays the time
 * @param {bool} [date=true] options.date - If true, displays the date
 * @param {string} [format=null] options.format - If specified, overrides with a moment.format() string
 * @return {string} The formatted date/time
 */
export function formatDate(obj, {type: type = 'short', time: time = false, date: date = true, format} = {type: 'short'}) {
	const m = moment.isMoment(obj) ? obj : moment(obj);
	let dateFormat;
	let timeFormat;
	switch (type || 'short') {
		case 'short':
			dateFormat = 'M/D/YYYY';
			timeFormat = 'h:mm a';
			break;
		case 'medium':
			dateFormat = 'MMM D, YYYY';
			timeFormat = 'h:mm a';
			break;
		case 'long':
			dateFormat = 'MMMM D, YYYY';
			timeFormat = 'h:mm a';
			break;
		default:
	}
	let formatString = (date === false) ? '' : dateFormat;
	if (time === true) {
		formatString = `${formatString} ${timeFormat}`;
	}
	return m.format(format || formatString);
}
