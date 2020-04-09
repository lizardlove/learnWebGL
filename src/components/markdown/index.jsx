import * as React from 'react'
import * as cx from 'classnames'

import * as marked from 'marked'

import "./base.less"

export default class Markdown extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        marked.setOptions({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: false,
            smartLists: true,
            smartypants: false
        })
    }
    render() {
        return (
            <div className='markdown'>
                <div dangerouslySetInnerHTML={{__html: marked(this.props.md.default)}} />
            </div>
        )
    }
}