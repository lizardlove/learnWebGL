import * as React from 'react'
import * as cx from 'classnames'

import './base.less'
import Life from './life'

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.container = React.createRef()
        this.game = {}

    }

    componentDidMount() {
        let that = this
        const canvas = this.container.current;
        canvas.width = window.innerWidth ;
        canvas.height = (window.innerHeight-64);
        this.game = new Life({
            canvas: canvas,
        })
        window.addEventListener('resize', () => {
            this.container.current.width = window.innerWidth;
            this.container.current.height = (window.innerHeight-64);
            this.game.resize(window.innerWidth, window.innerHeight-64)
        });
        canvas.addEventListener('click', e => {
            that.game.changeCellState(e.offsetX, e.offsetY)
        })
        this.game.init()
    }

    componentWillReceiveProps = (nextProps) => {
        if (JSON.stringify(nextProps) != '{}' && nextProps.run != this.game.run) {
            this.game.run = nextProps.run
            this.game.loop()
        }
        if (JSON.stringify(nextProps) != '{}' && nextProps.next == true) {
            this.game.token = true
            this.game.loop()
        }
        if (JSON.stringify(nextProps) != '{}' && nextProps.clear == true) {
            this.game.run = false
            this.game.token = true
            this.game.init()
        }
    }

    render() {
        return (
            <div className={cx('view', 'viewGameofLife')}>
                <canvas ref={this.container} />
            </div>
        )
    }
}