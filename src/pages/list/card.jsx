import * as React from 'react'
import * as cx from 'classnames'

import { Link } from 'react-router-dom'

import { FieldTimeOutlined, TagsOutlined } from '@ant-design/icons'

export default class Card extends React.PureComponent {
    constructor (props) {
        super(props)
        console.log(this.props.data)
    }

    render () {

        return (
            <div className={cx('card')} key={this.props.data.path}>
                <Link className={cx('cardCover')} to={`/workshop/${this.props.data.path}`} style={{backgroundImage: `url(${this.props.data.cover.default})`}}>
                    <p>
                        {this.props.data.name}&nbsp;
                        <span>{this.props.data.desc}</span>
                    </p>
                </Link>
                <div className={cx('cardInfo')}>
                    <p className={cx('cardTime')}>
                        <FieldTimeOutlined />&nbsp;
                        {this.props.data.date}
                    </p>
                    <p className={cx('cardTags')}>
                        <TagsOutlined /> &nbsp;
                        {this.props.data.tags.map(tag => (
                            <Link to={`/search?tags&${tag}`} key={tag}>{tag}&nbsp;</Link>
                        ))}
                    </p>
                </div>
            </div>
        )
    }
}