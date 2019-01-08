import * as React from 'react';
import {Popular} from './Popular';
import * as Styles from './index.css';
import * as ReactRouter from 'react-router-dom';
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
import {Nav} from './Nav';
import {Home} from './Home';
import {Battle} from './Battle';
import {Results} from './Results';
var Switch = ReactRouter.Switch;

export interface appProps {}
export interface appState {}

export class App extends React.Component<appProps,appState> {
    constructor(props: appProps){
        super(props);
    }
    render(){
        return(
            <Router>
                <div className={Styles.container}>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/popular' component={Popular} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/battle/results' component={Results} />
                        <Route render={function(){return <p>Not found</p>}} />
                    </Switch>
                </div>
            </Router>
        )
    }
};

