import React, {Component} from 'react';
import {LocalMonthSelect} from '../lib';
import {LocalDate} from 'js-joda';

class Demo extends Component {
	state = {
		localmonth: LocalDate.now(),
	};

	handleLocalMonthSelect = v => {
		this.setState({
			localmonth: v,
		});
	};

	render() {
		return (
			<div className="ui segment form">
				<div className="field">
					<label>LocalMonthSelect</label>
					<LocalMonthSelect onChange={this.handleLocalMonthSelect} value={this.state.localmonth}/>
				</div>
			</div>
		);
	}
}

ReactDOM.render((
	<div className="ui container grid">
		<div className="sixteen wide column">
			<h1 className="ui header">
				Date Demo
			</h1>
		</div>
		<div className="sixteen wide column">
			<Demo/>
		</div>
	</div>
), document.getElementById('root'));
