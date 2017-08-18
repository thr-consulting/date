/* eslint-disable global-require */
import {LocalDate} from 'js-joda';
import moment from 'moment';
import {
	dateInit,
	transformDateToLocalDate,
	transformLocalDateToDate,
	transformMomentToLocalDate,
	transformLocalDateToMoment,
	transformMomentsToDate,
	transformDatesToMoment,
	formatDate,
} from '../util';

jest.mock('react-widgets-moment');

expect.addSnapshotSerializer({
	test: v => moment.isMoment(v),
	print: v => v.toISOString(),
});
expect.addSnapshotSerializer({
	test: v => Object.prototype.toString.call(v) === '[object Date]',
	print: v => v.toJSON(),
});

describe('Date initialization', () => {
	it('should call the moment localizer', () => {
		const momentLocalizer = require('react-widgets-moment');
		dateInit();
		expect(momentLocalizer.mock.calls.length).toBe(1);
	});
});

describe('Date transforms', () => {
	it('should transform a JS date to a LocalDate', () => {
		const val = transformDateToLocalDate(new Date(2017, 5, 23, 6, 0, 0));
		expect(val).toBeInstanceOf(LocalDate);
		expect(val.dayOfMonth()).toBe(23);
		expect(val.monthValue()).toBe(6);
		expect(val.year()).toBe(2017);
	});

	it('should transform a LocalDate to a Date', () => {
		const val = transformLocalDateToDate(LocalDate.of(2017, 6, 23));
		expect(val).toBeInstanceOf(Date);
		expect(val.getDate()).toBe(23);
		expect(val.getMonth()).toBe(5);
		expect(val.getFullYear()).toBe(2017);
	});

	it('should transform a Moment to a LocalDate', () => {
		const val = transformMomentToLocalDate(moment([2017, 5, 23, 6, 0, 0]));
		expect(val).toBeInstanceOf(LocalDate);
		expect(val.dayOfMonth()).toBe(23);
		expect(val.monthValue()).toBe(6);
		expect(val.year()).toBe(2017);
	});

	it('should transform a LocalDate to a Moment', () => {
		const val = transformLocalDateToMoment(LocalDate.of(2017, 6, 23));
		expect(val).toBeInstanceOf(moment);
		expect(val.date()).toBe(23);
		expect(val.month()).toBe(5);
		expect(val.year()).toBe(2017);
	});

	it('should transform a single JS Date to a single Moment', () => {
		const val = transformDatesToMoment(new Date(2017, 5, 23, 6, 0, 0));
		expect(val).toBeInstanceOf(moment);
		expect(val.date()).toBe(23);
		expect(val.month()).toBe(5);
		expect(val.year()).toBe(2017);
	});

	it('should transform an array of Moments to an array of JS Dates', () => {
		const val = transformMomentsToDate([
			moment([2017, 5, 23, 6, 0, 0]),
			moment([2010, 10, 5, 10, 5, 6]),
		]);
		expect(val[0]).toBeInstanceOf(Date);
		expect(val[1]).toBeInstanceOf(Date);
		expect(val[0].getDate()).toBe(23);
		expect(val[0].getMonth()).toBe(5);
		expect(val[0].getFullYear()).toBe(2017);
		expect(val[1].getDate()).toBe(5);
		expect(val[1].getMonth()).toBe(10);
		expect(val[1].getFullYear()).toBe(2010);
	});

	it('should transform an array of JS Dates to an array of Moments', () => {
		const val = transformDatesToMoment([
			new Date(2017, 5, 23, 6, 0, 0),
			new Date(2010, 10, 5, 10, 5, 6),
		]);
		expect(val[0]).toBeInstanceOf(moment);
		expect(val[1]).toBeInstanceOf(moment);
		expect(val[0].date()).toBe(23);
		expect(val[0].month()).toBe(5);
		expect(val[0].year()).toBe(2017);
		expect(val[1].date()).toBe(5);
		expect(val[1].month()).toBe(10);
		expect(val[1].year()).toBe(2010);
	});

	it('should transform an object with Moment fields to the same object with JS Dates', () => {
		const val = transformMomentsToDate({
			field1: moment([2017, 5, 23, 6, 0, 0]),
			field2: moment([2010, 10, 5, 10, 5, 6]),
		});
		expect(val.field1).toBeInstanceOf(Date);
		expect(val.field2).toBeInstanceOf(Date);
		expect(val.field1.getDate()).toBe(23);
		expect(val.field1.getMonth()).toBe(5);
		expect(val.field1.getFullYear()).toBe(2017);
		expect(val.field2.getDate()).toBe(5);
		expect(val.field2.getMonth()).toBe(10);
		expect(val.field2.getFullYear()).toBe(2010);
	});

	it('should transform an object with JS Date fields to the same object with Moments', () => {
		const val = transformDatesToMoment({
			field1: new Date(2017, 5, 23, 6, 0, 0),
			field2: new Date(2010, 10, 5, 10, 5, 6),
		});
		expect(val.field1).toBeInstanceOf(moment);
		expect(val.field2).toBeInstanceOf(moment);
		expect(val.field1.date()).toBe(23);
		expect(val.field1.month()).toBe(5);
		expect(val.field1.year()).toBe(2017);
		expect(val.field2.date()).toBe(5);
		expect(val.field2.month()).toBe(10);
		expect(val.field2.year()).toBe(2010);
	});
});

describe('Formatting', () => {
	it('should format with defaults', () => {
		expect(formatDate(moment([2017, 5, 23, 6, 0, 0]))).toMatchSnapshot();
	});
	it('should format with options', () => {
		expect(formatDate(moment([2017, 5, 23, 6, 0, 0]), {type: 'short', time: true, date: true})).toMatchSnapshot();
		expect(formatDate(moment([2017, 5, 23, 6, 0, 0]), {type: 'medium', time: true, date: true})).toMatchSnapshot();
		expect(formatDate(moment([2017, 5, 23, 6, 0, 0]), {type: 'long', time: true, date: true})).toMatchSnapshot();
	});
	it('should use a custom date format', () => {
		expect(formatDate(moment([2017, 5, 23, 6, 0, 0]), {format: 'MMMM_D_YYYY_h_mm_a'})).toMatchSnapshot();
	});
});
