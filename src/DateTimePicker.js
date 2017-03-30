import React, {PropTypes} from 'react';
import DTPicker from 'react-widgets/lib/DateTimePicker';
import './dateTimePicker.less';

/**
 * DateTimePicker from {@link https://jquense.github.io/react-widgets/docs/#/datetime-picker|React Widgets}.
 * @class
 * @memberOf module:addons/date
 * @property {string} [width=null] - If set to 'auto' the input fills the width.
 * @property {Date} value
 * @property {onChange} onChange - Called when the value changes.
 */
export default function DateTimePicker(props) {
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
