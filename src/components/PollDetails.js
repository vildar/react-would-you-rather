import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button, Image, ProgressBar} from 'react-bootstrap'
import {handleAddQuestionAnswer} from '../actions/questions'

class PollDetails extends Component{
    state = {
        selectedOption: ""
    }

    onSelect = (e) => {
        this.setState(() => ({
            selectedOption: e
        }))
    }

    updateAnswer = (e, qid) => {
        e.preventDefault()
        const option = this.state.selectedOption
        const {dispatch} = this.props

        dispatch(handleAddQuestionAnswer(qid, option))
    }

    render(){
        const {qid, authedUser, users, questions} = this.props
        
        let sum = questions[qid].optionOne.votes.length + questions[qid].optionTwo.votes.length
        let now1 = questions[qid].optionOne.votes.length / sum * 100
        let now2 = questions[qid].optionTwo.votes.length / sum * 100
        
        return (
            <div>
                {
                    users[authedUser].answers[qid] 
                    ?   <div key={qid} className="card" id="detailsCard">
                            <div className="card-body">
                                <h5 className="card-title">Would You Rather</h5>
                                <h6 className="card-subtitle mb-2 text-muted" id="optionOneSubtitle">Asked by,</h6>
                                <Image id="userAvatarInCard" src={`${users[questions[qid].author].avatarURL}`} thumbnail roundedCircle />
                                <hr id="headingHr"/>
                                <h6 className="card-subtitle mb-2 text-muted" id="optionOneSubtitle">Option One:</h6>
                                <p className="card-text" id="optionOneText">{questions[qid].optionOne.text}</p>
                                <p className="card-text" id="optionOneText">{`${questions[qid].optionOne.votes.length} of ${sum} votes`}</p>
                                <div className={users[authedUser].answers[qid] === "optionOne" ? "indicateUserChoice" : null}>
                                    <ProgressBar now={now1} label={`${now1}%`} />
                                </div>
                                <hr />
                                <h6 className="card-subtitle mb-2 text-muted" id="optionTwoSubtitle">Option Two:</h6>
                                <p className="card-text" id="optionTwoText">{questions[qid].optionTwo.text}</p>
                                <p className="card-text" id="optionTwoText">{`${questions[qid].optionTwo.votes.length} of ${sum} votes`}</p>
                                <div className={users[authedUser].answers[qid] === "optionTwo" ? "indicateUserChoice" : null}>
                                    <ProgressBar now={now2} label={`${now2}%`} />
                                </div>
                            </div>
                        </div>
                    :   <div key={qid} className="card" id="detailsCard">
                            <div className="card-body">
                                <h5 className="card-title">Would You Rather</h5>
                                <h6 className="card-subtitle mb-2 text-muted" id="optionOneSubtitle">Asked by,</h6>
                                <Image id="userAvatarInCard" src={`${users[questions[qid].author].avatarURL}`} thumbnail roundedCircle />
                                <hr id="headingHr"/>
                                <Form onChange={(e) => this.onSelect(e.target.value)} onSubmit={(e) => this.updateAnswer(e, qid)} >
                                    <Form.Check
                                        type="radio"
                                        label={questions[qid].optionOne.text}
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios1"
                                        value="optionOne"
                                    />
                                    <Form.Check
                                        type="radio"
                                        label={questions[qid].optionTwo.text}
                                        name="formHorizontalRadios"
                                        id="formHorizontalRadios2"
                                        value="optionTwo"
                                    />
                                    <Button type="submit" disabled={!this.state.selectedOption}>
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, props){
    const qid = props.match.params.id

    return {
        qid,
        authedUser,
        users,
        questions
    }
}

export default connect(mapStateToProps)(PollDetails)