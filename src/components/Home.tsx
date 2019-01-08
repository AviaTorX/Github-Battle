import * as React from 'react';
import * as Styles from './index.css';
import {Link} from 'react-router-dom';

export class Home extends React.Component<any, any>{
    render(){
        return(
            <div className={Styles.homeContainer}>
                <h1>Github Battle: Battle your friends...and stuff</h1>
                <Link className={Styles.button} to='/battle'>Battle</Link>
            </div>
        )
    }
}