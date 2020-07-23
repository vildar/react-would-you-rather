import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {handleInitialData} from '../actions/shared'
import {connect} from 'react-redux'
import Login from './Login.js'
import HomePage from './HomePage'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import Leaderboard from './Leaderboard'
import AddQuestion from './AddQuestion'
import PollDetails from './PollDetails'
import Page404 from './Page404'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='mainDiv'>
            {this.props.authedUser && <Nav />}
            {this.props.authedUser
              ? <div>
                  <Redirect to="/"  />
                  <div>
                    <Switch>
                      <Route path='/' exact component={HomePage} />
                      <Route path='/question/:id' exact component={PollDetails} />
                      <Route path='/add' exact component={AddQuestion} />
                      <Route path='/leaderboard' exact component={Leaderboard} />
                      <Route component={Page404} />
                    </Switch>
                  </div>
                </div>
              : <Login />
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({authedUser}){
  return {
      authedUser
  }
}

export default connect(mapStateToProps)(App)