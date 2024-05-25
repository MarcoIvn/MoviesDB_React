import { IPill } from './types'
import React from 'react'
import classNames from 'classnames';
import './Pill.css'
const Pill: React.FC<IPill> = ({
    title,
})  => {
    return (
        <div className='pill_container'>
            {title}
        </div>
    )
}

export default Pill