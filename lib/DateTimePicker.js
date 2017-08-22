// @flow

import React from 'react';
import PropTypes from 'prop-types';
import DTPicker from 'react-widgets/lib/DateTimePicker';
import './dateTimePicker.css';

/**
 * DateTimePicker from {@link https://jquense.github.io/react-widgets/docs/#/datetime-picker|React Widgets}.
 * @class
 * @property {string} [width=null] - If set to 'auto' the input fills the width.
 * @property {Date} value - The JS Date object
 * @property {onChange} onChange - Called when the value changes.
 */
export default function DateTimePicker(props: Object) {
	let extraClasses;
	if (props.width === 'auto') {
		extraClasses = 'dateTimePickerAutoWidth';
	}
	const aprops = {...props};
	delete aprops.meta;
	return <DTPicker {...aprops} className={extraClasses}/>;
}

DateTimePicker.propTypes = {
	width: PropTypes.string,
};