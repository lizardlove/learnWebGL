import * as React from 'react'
import * as cx from 'classnames'

import './base.less'

import Card from './card'

export default class List extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            dataset: this.props.data,
            mode: this.props.mode,
        }
    }

    render() {

        return (
            <div className={cx('baseList')}>
                {this.state.dataset.map(item => (
                    <Card data={item} />
                ))}
            </div>
        )
    }
}