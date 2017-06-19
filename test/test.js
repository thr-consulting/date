import React from 'react';
import {MaskedInput} from '../dist';

before(() => {
	sinon.stub(console, 'error').callsFake(warning => {
		throw new Error(warning);
	})
});
after(() => {
	console.error.restore()
});

describe('MaskedInput', () => {
	const mask = {
		mask: '99-999-99', autoUnmask: true, showMaskOnHover: false,
	};

	it('renders without error', () => {
		shallow(<MaskedInput mask={mask}/>);
	});
});
