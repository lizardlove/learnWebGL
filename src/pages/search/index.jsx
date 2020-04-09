import * as React from 'react'
import * as cx from 'classnames'

import { withRouter } from 'react-router-dom'

import Tag from 'antd/es/tag'
import 'antd/es/tag/style/css'

const CheckTable = Tag.CheckableTag

import './base.less';

import { Card } from "../../components/card"
import { TagOutlined, ProjectOutlined } from '@ant-design/icons'

import { tags, tagsTable, names, programsTable} from '../../routes'


class Search extends React.Component {
    constructor(props) {
        super(props)

        let params = this.props.location.search.split('&')
        let mode = params[0] ? params[0].slice(1) : null
        let table = mode == 'tags' ? tags : names
        this.state = {
            mode: mode,
            selected: params.slice(1).filter(param => table.indexOf(param) > -1)
        }

    }

    updateParam(props) {
        let params = props.location.search.split('&')
        let mode = params[0] ? params[0].slice(1) : null
        let table = mode == 'tags' ? tags : names
        this.setState({
            mode: mode,
            selected: params.slice(1).filter(param => table.indexOf(param) > -1)
        })
    }

    componentWillReceiveProps(nextProps) {
        this.updateParam(nextProps)
    }

    handleCheckTags(tag, checked) {
        const checkedTags = this.state.selected
        const nextCheckedTags = checked ? [...checkedTags, tag] : checkedTags.filter(t => t !== tag)
        console.log(nextCheckedTags)
        this.setState({selected: nextCheckedTags})
    }

    renderCheckTags() {
        return (
            <div className={cx('tagsCheck')}>
                <div className={cx('cata')}><span>标签：</span></div>
                <div className={cx('tags')}>
                {
                    tags.map(tag => (
                        <CheckTable key={tag} checked={this.state.selected.indexOf(tag) > -1} onChange={checked => this.handleCheckTags(tag, checked)}>{tag}</CheckTable>
                    ))
                }
                </div>
            </div>
        )
    }

    renderContentByTag(tag) {
        const cards = tagsTable[tag]
        return (
            <div className={cx('classTag')}>
                <h2><TagOutlined />&nbsp;{tag}</h2>
                <div className={cx('cards')}>
                    {cards.map(card => (
                        <Card data={card} />
                    ))}
                </div>
            </div>
        )
    }

    renderContentByTitle(title) {
        return (
            <div className={cx('classTag')}>
                <h2><ProjectOutlined />&nbsp;{title}</h2>
                <div className={cx('cards')}>
                    <Card data={programsTable[title]} />
                </div>
            </div>
        )
    }

    render() {

        let content

        if (this.state.mode == 'tags') {
            content = this.state.selected.map(tag => this.renderContentByTag(tag))
        } else {
            content = this.state.selected.map(title => this.renderContentByTitle(title))
        }

        return (
            <div className={cx('workshopSearch')}>
                {this.state.mode == 'tags' ? this.renderCheckTags() : ''}
                {content}
            </div>
        )
    }
}

export default withRouter(Search)