import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Page404 extends Component{
    render(){
        return (
            <div>
                <img alt="Error 404 not found" src="https://wpklik.com/wp-content/uploads/2019/03/A-404-Page-Best-Practices-and-Design-Inspiration.jpg"  />
                <p style={{"textAlign":"center"}}>
                <Link to="/">Redirect to Home</Link>
                </p>
            </div>
        )    
    }
}

export default Page404