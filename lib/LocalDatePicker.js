import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {default as DTPicker} from 'react-widgets/lib/DateTimePicker';
import omit from 'lodash/omit';
import TPropTypes from 'tproptypes';
import './dateTimePicker.less';
import {transformLocalDateToDate, transformDateToLocalDate} from './util';

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

		const _value = value ? transformLocalDateToDate(value) : null;
		const _defaultValue = defaultValue ? transformLocalDateToDate(value) : null;
		const _min = min ? transformLocalDateToDate(min) : null;
		const _max = max ? transformLocalDateToDate(max) : null;
		const _currentDate = currentDate ? transformLocalDateToDate(currentDate) : null;
		const _defaultCurrentDate = currentDate ? transformLocalDateToDate(defaultCurrentDate) : null;

		const newProps = {};
		if (_value) newProps.value = _value;
		if (_defaultValue) newProps.defaultValue = _defaultValue;
		if (_min) newProps.min = _min;
		if (_max) newProps.max = _max;
		if (_currentDate) newProps.currentDate = _currentDate;
		if (_defaultCurrentDate) newProps.defaultCurrentDate = _defaultCurrentDate;
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
