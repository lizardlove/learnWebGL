import * as React from 'react'
import * as cx from 'classnames'

import { createPortal } from 'react-dom'
import { CloseCircleOutlined } from '@ant-design/icons'

import 'antd/es/style/css'

import "./base.less"


export default class SideBar extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                {
                    createPortal(
                        <div className={cx('sidebar', this.props.open && 'sidebarOpen', `sidebar${this.props.direction || 'Left'}`)}>
                            <CloseCircleOutlined className={cx('sidebarClose')} onClick={this.props.onClose} />
                            <h2 className={cx('sidebarTitle')}>{this.props.title}</h2>
                            <div className={cx('sidebarMain')}>
                                {
                                    ((this.props.childrenWithOpen && this.props.open) || !this.props.childrenWithOpen) && this.props.children
                                }
                            </div>
                        </div>,
                        document.body
                    )
                }
            </div>
        )
    }
}