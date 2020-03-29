import * as React from 'react'
import * as cx from 'classnames'

import {Link} from 'react-router-dom'

//import {Markdown, SideBar} from "../../components"

import Tools from './Tools'
import "./base.less"

export default class View extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            init: false,
            openInfo: false,
            openTools: false,
            openController: false,
            options: {}
        }
        this.info = ""
        this.Component = {}
        this.Controller = {}
    }

    async componentDidMount() {
        const asyncModule = (await this.props.asyncModule()).default
        this.Component = asyncModule.Component
        this.Controller = asyncModule.Controller
        this.info = asyncModule.info

        this.setState({init: true})

    }

    openSidebar(pair) {
        this.setState({
            openInfo: false,
            openTools: false,
            ...pair
        })
    }

    render() {
        if (!this.state.init) {
            return null
        }

        return (
            <div className={cx('pd-view')}>
                {this.renderMain()}
                {this.renderTopbar()}
                {/* {this.#renderInfo()}
                {this.#renderTools()}
                {this.#renderController()} */}
            </div>
        )
    }

    renderTopbar() {
        return (
            <div className={cx('pd-demo-topbar')}>
                <a href={this.props.code}
                   className={cx('pd-demo-title')}>
                       <h1>{this.props.name}</h1>
                </a>
                {this.renderActions()}
            </div>
        )
    }

    renderActions() {
        const {name} = this.props

        return (
            <div className={cx('pd-demo-actions')}>
                <div className={cx('pd-demo-action')} onClick={() => this.openSidebar({openInfo: !this.state.openInfo})}>
                    Details
                </div>
                <div className={cx('pd-demo-action')} onClick={() => this.openSidebar({openTools: !this.state.Tools})}>
                    Tools
                </div>
                <div className={cx('pd-demo-action')} onClick={() => this.openSidebar({openController: !this.state.openController})}>
                    Setting
                </div>
                <Link to={'/'} className={cx('pd-demo-action')}>
                    Back
                </Link>

            </div>
        )
    }

    renderMain() {
        const { Component } = this

        return (
            <div className={cx('pd-demo-main')}>
                <Component {...this.state.options} />
            </div>
        )
    }

}
