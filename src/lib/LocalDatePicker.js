import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DTPicker from 'react-widgets/lib/DateTimePicker';
import omit from 'lodash/omit';
import TPropTypes from '@thx/tproptypes';
import './dateTimePicker.css';
import {transformLocalDateToDate, transformDateToLocalDate} from './util';

/**
 * Let's you pick a LocalDate. No time parts are recorded.
 * @class
 * @property width
 * @property value
 * @property defaultValue
 * @property onChange
 * @property onSelect
 * @property min
 * @property max
 * @property currentDate
 * @property defaultCurrentDate
 * @property onCurrentDateChange
 */
export default class LocalDatePicker extends Component {
	static propTypes = {
		width: PropTypes.string,
		value: TPropTypes.localDate,
		defaultValue: TPropTypes.localDate,
		onChange: PropTypes.func,
		onSelect: PropTypes.func,
		min: TPropTypes.localDate,
		max: TPropTypes.localDate,
		currentDate: TPropTypes.localDate,
		defaultCurrentDate: TPropTypes.localDate,
		onCurrentDateChange: PropTypes.func,
	};

	handleChange = date => {
		if (this.props.onChange) this.props.onChange(date ? transformDateToLocalDate(date) : null);
	}

	handleSelect = date => {
		if (this.props.onSelect) this.props.onSelect(date ? transformDateToLocalDate(date) : null);
	}

	handleCurrentDateChange = date => {
		if (this.props.onCurrentDateChange) this.props.onCurrentDateChange(date ? transformDateToLocalDate(date) : null);
	}

	render() {
		const {
			value,
			defaultValue,
			width,
			min,
			max,
			currentDate,
			defaultCurrentDate,
			onCurrentDateChange,
			onChange,
			onSelect,
			...rest
		} = this.props;

		let extraClasses;
		if (width === 'auto') {
			extraClasses = 'dateTimePickerAutoWidth';
		}

		const ldpValue = value ? transformLocalDateToDate(value) : null;
		const ldpDefaultValue = defaultValue ? transformLocalDateToDate(value) : null;
		const ldpMin = min ? transformLocalDateToDate(min) : null;
		const ldpMax = max ? transformLocalDateToDate(max) : null;
		const ldpCurrentDate = currentDate ? transformLocalDateToDate(currentDate) : null;
		const ldpDefaultCurrentDate = currentDate ? transformLocalDateToDate(defaultCurrentDate) : null;

		const newProps = {};
		if (ldpValue) newProps.value = ldpValue;
		if (ldpDefaultValue) newProps.defaultValue = ldpDefaultValue;
		if (ldpMin) newProps.min = ldpMin;
		if (ldpMax) newProps.max = ldpMax;
		if (ldpCurrentDate) newProps.currentDate = ldpCurrentDate;
		if (ldpDefaultCurrentDate) newProps.defaultCurrentDate = ldpDefaultCurrentDate;
		if (onCurrentDateChange) newProps.onCurrentDateChange = this.handleCurrentDateChange;
		if (onChange) newProps.onChange = this.handleChange;
		if (onSelect) newProps.onSelect = this.handleSelect;

		return (<DTPicker
			{...newProps}
			time={false}
			className={extraClasses}
			{...omit(rest, ['time'])}
		/>);
	}
}
