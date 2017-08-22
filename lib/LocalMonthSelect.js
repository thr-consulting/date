import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Select} from 'semantic-ui-react';
import {LocalDate} from 'js-joda';
import debug from 'debug';

const d = debug('date:LocalMonthSelect');

const monthOptions = [
	{text: 'January', value: 1},
	{text: 'February', value: 2},
	{text: 'March', value: 3},
	{text: 'April', value: 4},
	{text: 'May', value: 5},
	{text: 'June', value: 6},
	{text: 'July', value: 7},
	{text: 'August', value: 8},
	{text: 'September', value: 9},
	{text: 'October', value: 10},
	{text: 'November', value: 11},
	{text: 'December', value: 12},
];

/**
 * Month select dropdown
 * @class
 * @property {onChange} onChange - Called when the value changes.
 * @property {Date} value - The value in date form. Day is ignored.
 * @property {number} [year=Current Year] - The year to use when selecting a date.
 */
export default class LocalMonthSelect extends Component {
	static propTypes = {
		onChange: PropTypes.func,
		value: PropTypes.instanceOf(LocalDate),
		year: PropTypes.number,
	};

	static defaultProps = {
		year: LocalDate.now().year(),
	};

	handleChange = (e, value) => {
		d('Month changed to:', value.value, e);
		if (this.props.onChange) {
			if (value !== '') {
				this.props.onChange(LocalDate.of(this.props.year, parseInt(value.value, 10), 1));
			} else {
				this.props.onChange(null);
			}
		}
	}

	render() {
		const {value} = this.props;

		return (
			<Select placeholder="Select Month" options={monthOptions} value={value ? value.monthValue() : ''} onChange={this.handleChange}/>
		);
	}
}
