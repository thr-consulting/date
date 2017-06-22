import React from 'react';
import {LocalMonthSelect} from '../dist';

before(() => {
	sinon.stub(console, 'error').callsFake(warning => {
		throw new Error(warning);
	})
});
after(() => {
	console.error.restore()
});

describe('LocalMonthSelect', () => {
	it('renders without error', () => {
		shallow(<LocalMonthSelect/>);
	});
});
