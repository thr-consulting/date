import React from 'react';
import {shallow} from 'enzyme';
import DateTimePicker from '../DateTimePicker';

describe('DateTimePicker', () => {
	it('should render without throwing an error', () => {
		expect(shallow(
			<DateTimePicker/>)).toMatchSnapshot();
	});

	// it('should respond to changes', () => {
	// 	const mockOnChange = jest.fn();
	//
	// 	const wrapper = mount(
	// 		<FieldMap
	// 			value="initial value"
	// 			as={Input}
	// 			asValue="value"
	// 			onChange={mockOnChange}
	// 		/>);
	// 	const u = wrapper.find('input');
	// 	u.simulate('change', {target: {value: 'blah blah'}});
	//
	// 	expect(mockOnChange.mock.calls.length).toBe(1);
	// 	expect(mockOnChange.mock.calls[0][0]).toEqual('blah blah');
	// });
});
