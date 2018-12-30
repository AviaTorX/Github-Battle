import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Styles from './index.css';


export interface popularProps {};
export interface popularState {selectedLanguage: string};

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

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

export class Popular extends React.Component<popularProps, popularState>{
    constructor(props: popularProps){
        super(props);
        this.state = {
            selectedLanguage: 'All'
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }
    updateLanguage(lang){
        this.setState({
                selectedLanguage: lang,
            })
    }
    render(){
        return(
            <div>
                <SelectLanguage 
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
            </div>
        )
    }
};