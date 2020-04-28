import * as React from 'react'
import * as cx from 'classnames'

import Switch from 'antd/es/switch'
import 'antd/es/switch/style/css'
import Button from 'antd/es/button'
import 'antd/es/button/style/css'

import "./base.less";

export default class Controller extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            run: false,
            next: 0,
            clear: false
        }
    }

    handleSetState(obj) {
        this.setState(obj, () => {
            this.changeOptions()
            this.setState({
                next: false,
                clear: false,
            })
        })
    }
    changeOptions() {
        this.props.handleChangeOptions(this.state)
    }

    render() {
        return (
        <div className={cx('controller')}>
            <div><Switch checkedChildren={'Runing'} unCheckedChildren={'Stop'} onChange={flag => this.handleSetState({run: flag})} /></div>
            <div>
                <Button type="primary" onClick={() => this.handleSetState({next: true})}>Next</Button>
                <Button type="ghost" className={cx('clear')} onClick={() => this.handleSetState({clear: true})}>Clear</Button>
            </div>
        </div>
        )
    }
}