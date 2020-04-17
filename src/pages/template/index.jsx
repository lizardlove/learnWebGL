import * as React from 'react'
import * as cx from 'classnames'

import {Link} from 'react-router-dom'

import { AimOutlined } from '@ant-design/icons'

import { SideBar, Markdown } from '../../components'
import Monitor from './monitor.jsx'

import "./base.less"

export default class View extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            init: false,
            openDocumentSide: false,
            openMonitorSide: false,
            openSettingSide: false,
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
            openDocumentSide: false,
            openMonitorSide: false,
            ...pair
        })
    }

    render() {
        if (!this.state.init) {
            return null
        }

        return (
            <div className={cx('workshop')}>
                {this.renderMain()}
                {this.renderTopbar()}
                {this.renderDocumentModal()}
                {this.renderSettingModal()}
                {this.rednerMonitorModal()}
            </div>
        )
    }

    renderTopbar() {
        return (
            <div className={cx('programTopBar')}>
                <a key={this.props.name} className={cx('programName')}>
                    {this.props.name}
                </a>
                <div className={cx('menuBar')}>
                    <div className={cx('menuItem')} onClick={() => this.openSidebar({openDocumentSide: !this.state.openDocumentSide})}>Document</div>
                    <div className={cx('menuItem')} onClick={() => this.openSidebar({openMonitorSide: !this.state.openMonitorSide})}>Monitor</div>
                    <div className={cx('menuItem')} onClick={() => this.openSidebar({openSettingSide: !this.state.openSettingSide})}>Setting</div>
                    <Link className={cx('menuItem')} to={'/'}>Back</Link>
                </div>
            </div>
        )
    }

    renderDocumentModal() {
        return (
            <SideBar title={'Document'} open={this.state.openDocumentSide} onClose={() => this.setState({openDocumentSide: false})}>
                <Markdown md={this.info} />
            </SideBar>
        )
    }
    rednerMonitorModal() {
        return (
            <SideBar title={'Monitor'} open={this.state.openMonitorSide} onClose={() => this.setState({openMonitorSide: false})}>
                <Monitor />
            </SideBar>
        )
    }

    renderSettingModal() {
        const Controller = this.Controller

        return (
            <SideBar title={'Setting'} open={this.state.openSettingSide} onClose={() => this.setState({openSettingSide: false})} direction={'Right'}>
                <Controller handleChangeOptions={options => this.setState({options: options})}></Controller>

            </SideBar>
        )
    }

    renderMain() {
        const { Component } = this

        return (
            <div className={cx('programView')}>
                <Component {...this.state.options} />
            </div>
        )
    }

}
