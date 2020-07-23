import React, {Component} from 'react'
import {Card, OverlayTrigger, Popover, Button} from 'react-bootstrap'
import {connect} from 'react-redux'

class Leaderboard extends Component{
    render(){
        const {numAsked, numAnswered, order, users} = this.props
        
        return (
            <div>
                {
                    order.map(id => (
                        <Card key={id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={users[id].avatarURL} />
                            <Card.Body>
                                <Card.Title>{users[id].name}</Card.Title>
                                <Card.Text style={{"textAlign": "center"}}>
                                    <OverlayTrigger 
                                        trigger="click" 
                                        placement="right" 
                                        overlay={
                                                    <Popover id="popover-basic">
                                                        <Popover.Title as="h3">{`${users[id].name}'s Score Details`}</Popover.Title>
                                                        <Popover.Content>
                                                        <h6 className="card-subtitle mb-2 text-muted">Asked:</h6>
                                                        <span>{numAsked[id]}</span>
                                                        <hr />
                                                        <h6 className="card-subtitle mb-2 text-muted">Answered:</h6>
                                                        <span>{numAnswered[id]}</span>
                                                        </Popover.Content>
                                                    </Popover>
                                                }
                                    >
                                        <Button variant="dark">Score: {numAnswered[id] + numAsked[id]}</Button>
                                    </OverlayTrigger>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
        )
    }
}

function mapStateToProps({users}){
    let count = {}
    let numAsked = {}
    let numAnswered = {}
    Object.keys(users).map(user => {
        count[user] = Object.keys(users[user].answers).length + users[user].questions.length
        numAnswered[user] = Object.keys(users[user].answers).length
        numAsked[user] = users[user].questions.length
        return {count, numAsked, numAnswered}
    })

    let order = Object.keys(count).sort((a, b) => count[b] - count[a])

    return {
        numAsked,
        numAnswered,
        order,
        users
    }
}

export default connect(mapStateToProps)(Leaderboard)