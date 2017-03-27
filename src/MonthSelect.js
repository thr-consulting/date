import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {SSelect} from 'controls';

/**
 * Month select dropdown
 * @class
 * @memberOf module:addons/date
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

	handleChange = value => {
		if (value !== '') {
			this.props.onChange(moment({
				year: this.props.year,
				month: parseInt(value, 10),
			}).toDate());
		} else {
			this.props.onChange(null);
		}
	}

	render() {
		const {value} = this.props;

		return (
			<SSelect onChange={this.handleChange} value={value ? value.getMonth() : ''}>
				<option value="">Select Month</option>
				<option value="0">January</option>
				<option value="1">February</option>
				<option value="2">March</option>
				<option value="3">April</option>
				<option value="4">May</option>
				<option value="5">June</option>
				<option value="6">July</option>
				<option value="7">August</option>
				<option value="8">September</option>
				<option value="9">October</option>
				<option value="10">November</option>
				<option value="11">December</option>
			</SSelect>
		);
	}
}
