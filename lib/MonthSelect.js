import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Select} from 'semantic-ui-react';
import debug from 'debug';

const d = debug('date:MonthSelect');

const monthOptions = [
	{text: 'January', value: 0},
	{text: 'February', value: 1},
	{text: 'March', value: 2},
	{text: 'April', value: 3},
	{text: 'May', value: 4},
	{text: 'June', value: 5},
	{text: 'July', value: 6},
	{text: 'August', value: 7},
	{text: 'September', value: 8},
	{text: 'October', value: 9},
	{text: 'November', value: 10},
	{text: 'December', value: 11},
];

/**
 * Month select dropdown
 * @class
 * @property {onChange} onChange - Called when the value changes.
 * @property {Date} value - The value in date form. Day is ignored.
 * @property {number} [year=Current Year] - The year to use when selecting a date.
 */
export default class MonthSelect extends Component {
	static propTypes = {
		onChange: PropTypes.func,
		value: PropTypes.instanceOf(Date),
		year: PropTypes.number,
	};

	static defaultProps = {
		year: new Date().getFullYear(),
	};

	handleChange = (e, value) => {
		d('Month changed to:', value.value, e);
		if (value !== '') {
			this.props.onChange(moment({
				year: this.props.year,
				month: parseInt(value.value, 10),
			}).toDate());
		} else {
			this.props.onChange(null);
		}
	}

	render() {
		const {value} = this.props;

		return (
			<Select placeholder="Select Month" options={monthOptions} value={value ? value.getMonth() : ''} onChange={this.handleChange}/>
		);
	}
}
