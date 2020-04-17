import * as React from 'react'
import * as cx from 'classnames'

import Switch from 'antd/es/switch'
import 'antd/es/switch/style/css'

export default class Controller extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            run: true
        }
    }

    handleSetState(obj) {
        this.setState(obj, () => {
            this.changeOptions()
        })
    }
    changeOptions() {
        this.props.handleChangeOptions(this.state)
    }

    render() {
        return (
        <div className={cx('controller')}>
            Run: <Switch defaultChecked onChange={flag => this.handleSetState({run: flag})} />
        </div>
        )
    }
}