import * as React from 'react';

interface LoadingProps {
    text: string;
    speed: number;
}

interface LoadingState {
    text: string;
}

export class Loading extends React.Component<LoadingProps, LoadingState>{
    static defaultProps = {
        text : 'Loading',
        speed:300
    }
    constructor(props: LoadingProps){
        super(props);
        this.state = {
            text: props.text
        }
    }
    componentDidMount(){
        var stopper = this.props.text+'...';
        window.setInterval(function(){
            if(this.state.text === stopper){
                this.setState({
                    text: this.props.text
                })
            }
            else {
                this.setState(function(prevState){
                    return {
                        text: prevState.text + '.'
                    }
                })
            }
        }.bind(this), this.props.speed)
    }
    componentWillUnmount(){
        window.clearInterval();
    }
    render(){
        return(
            <p style={{textAlign:'center', fontSize:'35px'}}>
                {this.state.text}
            </p>
        )
    }
}