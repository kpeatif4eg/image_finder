import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    HashRouter as Router,
    Switch,
    Route,
    } from 'react-router-dom';
import Cards from './Containers/Cards';
import CardDetails from './Containers/CardDetails';
import { getImgs } from '../Business/actions';


class App extends Component {
    componentDidMount() {
        const { load } = this.props;
        load();
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={() => <Cards {...this.props} />} />
                    <Route path='/about:id' render={() => <CardDetails imgArr={this.props} />} />
                </Switch>
            </Router>
        );
    }
}


export default connect(
    null,
    {
        load: getImgs,
    },

)(App);
