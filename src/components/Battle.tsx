import * as React from 'react';
import {Link} from 'react-router-dom';
import * as PropTypes from 'prop-types';
import * as Styles from './index.css';
import {PlayerPreview} from './PlayerPreview';

interface BattleProps {
    match: any;
}

interface BattleState{
    playerOneName: string;
    playerTwoName: string;
    playerOneImage: any;
    playerTwoImage: any;
}
  
  interface PlayerInputProps{
    label: string;
    id: string;
    onSubmit: Function;
  }

  interface PlayerInputState{
    username: string
  }
  
  class PlayerInput extends React.Component<PlayerInputProps, PlayerInputState> {
    static defaultProps = {
        label:'Username'
    }
    constructor(props:PlayerInputProps) {
      super(props);
      this.state = {
        username: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
      var value = event.target.value;
  
      this.setState(function () {
        return {
          username: value
        }
      });
    }
    handleSubmit(event) {
      event.preventDefault();
  
      this.props.onSubmit(
        this.props.id,
        this.state.username
      );
    }
    render() {
      return (
        <form className={Styles.column} onSubmit={this.handleSubmit}>
          <label className={Styles.header} htmlFor='username'>{this.props.label}</label>
          <input
            id='username'
            placeholder='github username'
            type='text'
            value={this.state.username}
            autoComplete='off'
            onChange={this.handleChange}
          />
          <button
            className={Styles.button}
            type='submit'
            disabled={!this.state.username}>
              Submit
          </button>
        </form>
      )
    }
  }
 

export class Battle extends React.Component<BattleProps, BattleState>{
    constructor(props: BattleProps){
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleSubmit(id, username) {
        this.setState(function () {
          var newState = {};
          newState[id + 'Name'] = username;
          newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
          return newState;
        });
      }
    handleReset(id) {
    this.setState(function () {
        var newState = {};
        newState[id + 'Name'] = '';
        newState[id + 'Image'] = null;
        return newState;
    })
    }
    render(){
        var match = this.props.match;
        var playerOneName = this.state.playerOneName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoName = this.state.playerTwoName;
        var playerTwoImage = this.state.playerTwoImage;
        return(
            <div>
                <div className={Styles.row}>
                    {!playerOneName &&
                        <PlayerInput
                        id='playerOne'
                        label='Player One'
                        onSubmit={this.handleSubmit}
                        />}

                    {playerOneImage !== null &&
                        <PlayerPreview
                        avatar={playerOneImage}
                        username={playerOneName}>
                         <button
                            className={Styles.reset}
                            onClick={this.handleReset.bind(null, 'playerOne')}>
                                Reset
                        </button>
                        </PlayerPreview>}

                    {!playerTwoName &&
                        <PlayerInput
                        id='playerTwo'
                        label='Player Two'
                        onSubmit={this.handleSubmit}
                        />}

                    {playerTwoImage !== null &&
                        <PlayerPreview
                        avatar={playerTwoImage}
                        username={playerTwoName}>
                            <button
                                className={Styles.reset}
                                onClick={this.handleReset.bind(null, 'playerTwo')}>
                                    Reset
                            </button>
                        </PlayerPreview>}
                    </div>

                    {playerOneImage && playerTwoImage &&
                    <Link
                        className={Styles.button}
                        to={{
                        pathname: match.url + '/results',
                        search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                        }}>
                        Battle
                    </Link>}
            </div>
        )
    }
}