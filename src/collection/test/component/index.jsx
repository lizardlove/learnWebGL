import * as React from 'react'
import * as cx from 'classnames'

import './base.less'

export default class Demo extends React.Component {
    render() {
        return (
            <div className={cx('view')}>
                "This is the deep demo"
            </div>
        )
    }
}