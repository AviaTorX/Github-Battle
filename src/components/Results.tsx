import * as React from 'react';
import * as queryString from 'query-string';
import * as api from './../utils/api';
import { Link } from 'react-router-dom';
import * as Styles from './index.css';
import * as PropTypes from 'prop-types';
import {PlayerPreview} from './PlayerPreview';
import {Loading} from './Loading';

function Profile(props){
    return(
        <PlayerPreview avatar={props.info.avatar_url} username={props.info.login}>
            <ul className={Styles.spaceListItems}>
            {props.info.name && <li>{props.info.name}</li>}
            {props.info.location && <li>{props.info.location}</li>}
            {props.info.company && <li>{props.info.company}</li>}
            <li>Followers: {props.info.followers}</li>
            <li>Following: {props.info.following}</li>
            <li>Public Repos: {props.info.public_repos}</li>
            {props.info.blog && <li><a href={props.info.blog}>{props.info.blog}</a></li>}
    </ul>
        </PlayerPreview>
    )
}

function Player(props){
    return(
        <div>
            <h1 className={Styles.header}>{props.label}</h1>
            <h3 style={{textAlign:'center'}}>Score: {props.score}</h3>
            <Profile info={props.profile}/>
        </div>
    )
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
}

interface ResultsProps {
    location: any;
}

interface ResultsState {
    error: string;
    loading: boolean;
    winner: any;
    loser: any
}

export class Results extends React.Component<ResultsProps, ResultsState>{
    constructor(props:ResultsProps){
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount(){
        var players = queryString.parse(this.props.location.search);

        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(function(results){
            if(results === null){
                return this.setState({
                    error: 'Looks like there was error. Check that both users exist on Github',
                    loading: false
                })
            }
            this.setState({
                error: null,
                winner: results[0],
                loser: results[1],
                loading: false
            })
        }.bind(this))
    }
    render(){
        var error  = this.state.error;
        var winner = this.state.winner;
        var loser = this.state.loser;
        var loading = this.state.loading;
        if(loading === true){
            return <Loading text={'Waiting'}/>
        }
        if(error){
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }
        return(
            <div className={Styles.row}>
                <Player
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }
}