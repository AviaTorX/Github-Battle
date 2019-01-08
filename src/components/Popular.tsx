import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Styles from './index.css';
import {fetchPopularRepos} from './../utils/api';
import {Loading} from './Loading';

export interface popularProps {};
export interface popularState {selectedLanguage: string, repos : any};

function SelectLanguage(props){
    let langaugaes = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
    return(
        <ul className={Styles.languages}>
            {
                langaugaes.map(function(lang){
                    return(
                        <li
                            style={lang === props.selectedLanguage? {color:'#d0021b'}: null}
                            onClick={props.onSelect.bind(null, lang)}
                            key={lang}
                        >
                            {lang}
                        </li>
                    )
                })
            }
        </ul>
    )
}

function RepoGrid(props){
    return(
        <ul className={Styles.popularList}>
            {
                props.repos.map(function(repo, index){
                    return(
                        <li key={repo.name} className={Styles.populaItem}>
                            <div className={Styles.popularRank}>#{index + 1}</div>
                            <ul className={Styles.spaceListItems}>
                                <li>
                                    <img className={Styles.avatar} src={repo.owner.avatar_url} alt={'Avatar for '+repo.owner.login} />
                                </li>
                                <li><a href={repo.html_url}>{repo.name}</a></li>
                                <li>@{repo.owner.login}</li>
                                <li>{repo.stargazers_count} stars</li>
                            </ul>
                        </li>
                    )
                })
            }
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

export class Popular extends React.Component<popularProps, popularState>{
    constructor(props: popularProps){
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }
    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage);
    }
    updateLanguage(lang){
        this.setState({
            selectedLanguage: lang,
            repos: null
        });

        fetchPopularRepos(lang)
        .then(function(repos){
            return this.setState({
                repos: repos
            })
        }.bind(this))

    }
    render(){
        return(
            <div>
                <SelectLanguage 
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {
                    (this.state.repos === 'undefined' || this.state.repos === null)?<Loading text={'Downloading'}/>:<RepoGrid repos={this.state.repos} />
                }
            </div>
        )
    }
};
