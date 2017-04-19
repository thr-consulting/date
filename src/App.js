import React, { Component } from 'react';
import {Grid, Header, Form, Segment} from 'semantic-ui-react';
import {LocalDate} from 'js-joda';
import {LocalMonthSelect} from '../dist';

class App extends Component {
	state = {
		localmonth: LocalDate.now(),
		localdatepicker: LocalDate.now(),
		datetimepicker: new Date(),
	};

	handleLocalMonthSelect = v => {
		this.setState({localmonth: v});
	};

	handleLocalDatePicker = v => {
		this.setState({localdatepicker: v});
	};

	handleDateTimePicker = v => {
		this.setState({datetimepicker: v});
	};

  render() {
    return (
    	<Grid container>
		    <Grid.Row>
			    <Grid.Column>
				    <Header as="h1">Date Demo</Header>
			    </Grid.Column>
		    </Grid.Row>
		    <Grid.Row>
			    <Grid.Column>
				    <Segment>
					    <Form>
						    <Form.Field>
							    <label>LocalMonthSelect</label>
							    <LocalMonthSelect onChange={this.handleLocalMonthSelect} value={this.state.localmonth}/>
						    </Form.Field>
					    </Form>
				    </Segment>
			    </Grid.Column>
		    </Grid.Row>
	    </Grid>
    );
  }
}

export default App;
