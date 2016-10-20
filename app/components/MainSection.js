import React, { Component, PropTypes } from 'react';

import { IS_LOGIN, NOT_LOGIN } from '../constants/LoginFilters';
import ReactBootstrap , { Button,Form,FormGroup,FormControl,ControlLabel }  from 'react-bootstrap';
// import {} from 'redux'



import style from './MainSection.css';

const TODO_FILTERS = {
    [IS_LOGIN]: () => false
    // [SHOW_ACTIVE]: todo => !todo.completed,
    // [SHOW_COMPLETED]: todo => todo.completed
};

export default class MainSection extends Component {

    static propTypes = {
        login_state: PropTypes.string.isRequired,
        actions: PropTypes.object.isRequired
    };
    handleSubmit = filter => {
        // console.log(this.refs);
        // console.log(this.refs.nameTxt.getInputDOMNode());
        // const name = this.refs.nameTxt.value;//ReactDOM.findDOMNode(this.refs.nameTxt).getValue();
        // const pwd = '';//ReactDOM.findDOMNode('pwdTxt').getValue();
        // console.log(this.state);
        // action('LOGIN');
        // actions.
        this.props.actions.login(this.state.userName,this.state.userPassword);
        // return false;

    };
    constructor(props, context) {
        super(props, context);
        // this.state = { filter: NOT_LOGIN };
    }

    render() {
        const formInstance = (
            <Form horizontal  >
                <FormGroup  controlId="nameTxt">
                    <ControlLabel>Name</ControlLabel>
                    {':'}
                    <FormControl onChange={(e)=>{this.setState({userName:e.target.value })}}
                                 type="text" placeholder="Name" />
                </FormGroup>
                {' '}
                <FormGroup controlId="pwdTxt">
                    <ControlLabel>Password</ControlLabel>
                    {':'}
                    <FormControl onChange={(e)=>{this.setState({userPassword:e.target.value })}} type="password" placeholder="Password" />
                </FormGroup>
                <Button onClick={this.handleSubmit} >
                    Login
                </Button>
                {'      '}
                <a href="#">Forgot password?</a>
            </Form>
        );

        return ( <div>

            </div>
        )
    }
}
