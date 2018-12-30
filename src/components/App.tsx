import * as React from 'react';
import {Popular} from './Popular';
import * as Styles from './index.css';

export interface appProps {}
export interface appState {}

export class App extends React.Component<appProps,appState> {
    constructor(props: appProps){
        super(props);
    }
    render(){
        return(
            <div className={Styles.container}>
                <Popular />
            </div>
        )
    }
};

