import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom';

class AddQuestion extends Component{
    state = {
        optionOne: "",
        optionTwo: "",
        addedQuestion: false
    }
    
    updateStateOne = (optionOne) => {
        this.setState(() => ({
            optionOne
        }))
    }

    updateStateTwo = (optionTwo) => {
        this.setState(() => ({
            optionTwo
        }))
    }

    onSubmit = (e) => {
        e.preventDefault()

        const {dispatch} =  this.props
        const {optionOne, optionTwo} = this.state
        
        this.setState(() => ({
            addedQuestion: true
        }))
        
        dispatch(handleAddQuestion(optionOne, optionTwo))
    }

    render(){
        const addedQuestion = this.state.addedQuestion
        if(addedQuestion){
            return <Redirect to="/" />
        }
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Create New Question</h5>
                    <hr id="headingHr"/>
                    <h6 className="card-title">Would You Rather</h6>
                    <Form onSubmit={e => this.onSubmit(e)}>
                        <Form.Group controlId="newQuestionOptionOne">
                            <Form.Label>Option One</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Be a superhero"
                                onChange={e => this.updateStateOne(e.target.value)}
                            />
                        </Form.Group>
                        <div style={{"width": "100%", "height": "15px", "borderBottom": "1px solid black", "textAlign": "center"}}>
                            <span style={{"fontSize": "15px", "backgroundColor": "white", "padding": "0 10px"}}>
                                OR
                            </span>
                        </div>
                        <br />
                        <Form.Group controlId="newQuestionOptionTwo">
                            <Form.Label>Option Two</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Be a supervillain" 
                                onChange={e => this.updateStateTwo(e.target.value)}
                            />
                        </Form.Group>
                        <div id="newQuestionBtn">
                            <Button 
                                type="submit" 
                                disabled={!this.state.optionTwo && !this.state.optionTwo}
                            >
                                Submit
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

export default connect()(AddQuestion)