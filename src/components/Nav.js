import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import {Navbar, Image, Container, Row, Col, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
    onLogout = () => {
        const {dispatch} = this.props

        dispatch(setAuthedUser(null))
    }
    
    render(){
        return (
            <>
                <Navbar className="navbar-dark bg-dark" style={{"width": "100%"}}>
                        <Navbar.Brand>
                            <h1>Would You Rather</h1>
                        </Navbar.Brand>
                        <Container id="navLinks">
                            <ul>
                                <li>
                                    <NavLink to='/' exact activeClassName='active'>
                                        <p>Home</p>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/add' exact activeClassName='active'>
                                        <p>New Question</p>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/leaderboard' exact activeClassName='active'>
                                        <p>Leaderboard</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </Container>
                        <Container style={{"color": "white"}}>
                            <Row>
                                <Col xs={6} md={4}>
                                    <div>
                                        <p>Logged in as, {this.props.name}</p>
                                    </div>
                                </Col>
                                <Col xs={6} md={4}>
                                    <Image id="userAvatar" src={`${this.props.avatarURL}`} thumbnail roundedCircle />
                                </Col>
                                <Col xs={6} md={4}>
                                    <Button 
                                        type="submit" 
                                        className="btn btn-warning"
                                        onClick={this.onLogout}
                                    >
                                        Logout
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                </Navbar>
            </>
        )
    }
}

function mapStateToProps({authedUser, users}){
    return {
        avatarURL: users[authedUser].avatarURL,
        name: users[authedUser].name
    }
}

export default connect(mapStateToProps)(Nav)