import React, {Component} from 'react';
import {Image, Card, Navbar, Form, Button, Col} from 'react-bootstrap'
import {connect} from 'react-redux'
import '../index.scss'
import {setAuthedUser} from '../actions/authedUser'

class Login extends Component {
    state = {
        selectedUsername: ""
    }

    changeState = (value) => {
        if(value === "0"){
            this.setState(() => ({
                selectedUsername: ""
            }))
        } else{
            this.setState(() => ({
                selectedUsername: value
            }))
        }
    }

    onSubmit = (event) => {
        event.preventDefault()
        const authedUser = this.state.selectedUsername
        const {dispatch} = this.props

        if(authedUser){
            dispatch(setAuthedUser(authedUser))
        } else{
            alert('You must choose a username to login and use the app!')
        }
    }

    render() {
        const {users} = this.props

        return (
            <>
                <Navbar className="navbar-dark bg-dark justify-content-md-center">
                    <Navbar.Brand>
                        <h1>Would You Rather</h1>
                    </Navbar.Brand>
                </Navbar>
                <Card className="text-center">
                    <Card.Header className="bg-dark"><h4>Login Before Continuing...</h4></Card.Header>
                    <Card.Body>
                        <Image id="logo" src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"/>
                        <Form>
                            <Form.Row className="justify-content-md-center">
                                <Col xs="auto" className="my-1">
                                    <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
                                        Preference
                                    </Form.Label>
                                    <Form.Control
                                        as="select"
                                        className="mr-sm-2"
                                        id="inlineFormCustomSelect"
                                        custom
                                        onChange={(e) => this.changeState(e.target.value)}
                                    >
                                        <option value="0">Choose User</option>
                                        {
                                            users &&
                                            Object.entries(users).map((user) => (
                                                <option 
                                                    key={`${user[1].id}`}
                                                    value={`${user[1].id}`}
                                                >
                                                    {user[1].name}
                                                </option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>
                                <Col xs="auto" className="my-1">
                                    <Button 
                                        type="submit" 
                                        id="btn-login"
                                        onClick={this.onSubmit}
                                    >
                                        Login
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

function mapStateToProps({users}){
    return {
        users
    }
}

export default connect(mapStateToProps)(Login)