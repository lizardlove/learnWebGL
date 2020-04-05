import * as React from 'react'
import * as cx from 'classnames'

import { Link } from 'react-router-dom'

import './base.less'

import Select from 'antd/es/select'
import 'antd/es/select/style/css';
import Switch from 'antd/es/switch'
import 'antd/es/switch/style/css'
import { TagsTwoTone, ProfileTwoTone, SearchOutlined, HomeOutlined } from '@ant-design/icons'

import { tags } from '../../routes'
import { names } from '../../routes'

export default class TopBar extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            searchParams: [],
            searchFlag: true
        }

    }
    handleSwitch = (flag) => {
        this.setState({searchFlag: flag, searchParams: []})
    }
    handleSearchSelect = (values) => {
        this.setState({searchParams: values})
    }
    render() {
        let searchBox
        if (this.state.searchFlag) {
            searchBox = <Select className={cx('searchSelect')} mode="multiple" style={{width: "100%"}} onChange={this.handleSearchSelect} value={this.state.searchParams} placeholder={this.state.searchFlag ? "input title" : "input tags"}>
                {
                    names.map((name, index) => (
                    <Select.Option key={name+index} value={name}>{name}</Select.Option>
                    ))
                }
            </Select>
        } else {
            searchBox = <Select className={cx('searchSelect')} mode="multiple" style={{width: "100%"}} onChange={this.handleSearchSelect} value={this.state.searchParams} placeholder={this.state.searchFlag ? "input title" : "input tags"}>
                {
                    tags.map((tag,index) => (
                    <Select.Option key={tag+index} value={tag}>{tag}</Select.Option>
                    ))
                }
            </Select>
        }

        return (
            <header className={cx('workshopTopBar')}>
                <Link to={'/'} className={cx('logo')}>
                    <h1>Pipiper's Workshop</h1>
                </Link>
                <div className={cx('search')}>
                    <div className={cx('searchBox')}>
                        <Switch className={cx('flagSwitch')} checkedChildren={<ProfileTwoTone />} unCheckedChildren={<TagsTwoTone />} defaultChecked onChange={this.handleSwitch} />
                        {searchBox}
                        <Link className={cx('searchButton')} to={this.state.searchFlag ? `/search?program&${this.state.searchParams.join('&')}` : `/search?tags&${this.state.searchParams.join('&')}`}>
                            <SearchOutlined />
                        </Link>
                    </div>
                </div>
                <a className={cx('leave')} href="https://blog.lizardlove.ren"><HomeOutlined /></a>
            </header>
        )
    }
}