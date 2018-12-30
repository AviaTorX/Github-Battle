import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {App} from './components/App';

// class App extends React.Component {
//     render(){
//         return(
//             <Hello compiler="Typescript" framework="React"></Hello>
//         )
//     }
// }

ReactDOM.render(
    <App />,
    document.getElementById("app")
)