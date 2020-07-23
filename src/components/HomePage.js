import React, {Component} from 'react'
import {Tabs, Tab, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

class HomePage extends Component{
    state = {
        key: "uq"
    }

    setKey = (key) => {
        this.setState(() => ({
            key
        }))
    }

    showPoll = (e, qid) => {
        e.preventDefault()
        this.props.history.push(`/question/${qid}`)
    }

    render(){
        return (
            <div id="homeTab">
                <Tabs 
                    id="controlled-tab-example"
                    activeKey={this.state.key}
                    onSelect={(k) => this.setKey(k)}
                >
                    <Tab eventKey="uq" title="Unanswered Questions"></Tab>
                    <Tab eventKey="aq" title="Answered Questions"></Tab>
                </Tabs>
                {
                    this.state.key === "aq" &&
                    this.props.aqIDs.map(q => (
                        <div key={q} className="card" id="wyrCard">
                            <div className="card-body">
                                <h5 className="card-title">Would You Rather</h5>
                                <hr id="headingHr"/>
                                <h6 className="card-subtitle mb-2 text-muted" id="optionOneSubtitle">Option One:</h6>
                                <p className="card-text" id="optionOneText">{this.props.questions[q].optionOne.text}</p>
                                <hr />
                                <h6 className="card-subtitle mb-2 text-muted" id="optionTwoSubtitle">Option Two:</h6>
                                <p className="card-text" id="optionTwoText">{this.props.questions[q].optionTwo.text}</p>
                                <Button onClick={(e) => this.showPoll(e, q)}>
                                    View Poll
                                </Button>
                            </div>
                        </div>
                    ))
                }
                {
                    this.state.key === "uq" && 
                    this.props.uqIDs.map(q => (
                        <div key={q} className="card" id="wyrCard">
                            <div className="card-body">
                                <h5 className="card-title">Would You Rather</h5>
                                <hr id="headingHr"/>
                                <h6 className="card-subtitle mb-2 text-muted" id="optionOneSubtitle">Option One:</h6>
                                <p className="card-text" id="optionOneText">{this.props.questions[q].optionOne.text}</p>
                                <hr />
                                <h6 className="card-subtitle mb-2 text-muted" id="optionTwoSubtitle">Option Two:</h6>
                                <p className="card-text" id="optionTwoText">{this.props.questions[q].optionTwo.text}</p>
                                <Button onClick={(e) => this.showPoll(e, q)}>
                                    View Poll
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}){
    const aqIDs = Object.keys(users[authedUser].answers).sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    const uqIDs = Object.keys(questions).filter(qid => !aqIDs.includes(qid)).sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    return {
        aqIDs,
        uqIDs,
        questions
    }
}

export default connect(mapStateToProps)(HomePage)