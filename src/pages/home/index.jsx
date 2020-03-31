import * as React from 'react'
import * as cx from 'classnames'

import {programs} from "../../routes"

import "./base.less"

const Home = () => (
    <div className={cx('pd-home')}>
        {
            programs.map(program => (
                <h1 key={program.name}></h1>
            ))
        }
    </div>
)

export default Home