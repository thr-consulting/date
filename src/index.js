/**
 * Date Addons module
 * @module module:addons/date
 */
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import moment from 'moment';
import DateTimePicker from './DateTimePicker';
import RecurringEdit from './RecurringEdit';
import MonthSelect from './MonthSelect';
import {formatDate, transformDatesToMoment, transformMomentsToDate} from './util';

function dateInit() {
	momentLocalizer(moment);
}

export {
	DateTimePicker,
	RecurringEdit,
	MonthSelect,
	dateInit,
	formatDate,
	transformMomentsToDate,
	transformDatesToMoment,
};
