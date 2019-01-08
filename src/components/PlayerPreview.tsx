import * as React from 'react';
import * as Styles from './index.css'

export function PlayerPreview (props) {
    return (
      <div>
        <div className={Styles.column}>
          <img
            className={Styles.avatar}
            src={props.avatar}
            alt={'Avatar for ' + props.username}
          />
          <h2 className='username'>@{props.username}</h2>
        </div>
       {props.children}
      </div>
    )
  }