import * as React from 'react'
import * as cx from 'classnames'
import * as eruda from 'eruda'
import * as erudaTiming from 'eruda-timing'
import * as Stats from 'stats-js'

export default class Tools extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openSetting: false,
            openTools: false
        }
        this.stats
        this.rafID = 0
        this.statsContainer = React.createRef()
        this.consoleContainer = React.createRef()
    }

    componentDidMount() {
        this.initTools()
        this.loop()
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rafID)
        eruda.destroy()
    }

    initTools() {
        if (window.performance) {
            const stats = this.stats = new Stats()
            stats.showPanel(0)
            stats.showPanel(1)
            stats.showPanel(2)
            stats.dom.className = 'pd-tools-stats.content'
            stats.dom.style.position = 'relative'
            this.statsContainer.current.appendChild(stats.dom)

            const children = stats.dom.children
            for(let i = 0; i < children.length; i +=1) {
                children[i].style.display = 'inline-block'
                children[i].style.width = '32%'
                children[i].style.marginRight = '1%'
                children[i].style.height = '84px'
            }
        }

        eruda.init({
            container: this.consoleContainer.current,
            tool: ['console', 'timing', 'info']
        })
        eruda.add(erudaTiming)
        eruda.show()

        const devTools = document.getElementsByClassName('erdua-dev-tools')[0]
        devTools.style.height = ''
    }

    loop() {
        if (this.stats) {
            this.stats.update()
            this.rafID = requestAnimationFrame(this.loop)
        }
    }

    render() {
        return (
            <div className={'pd-demo-tools'}>
                <div className={cx('pd-tools-stats')}
                     ref={this.statsContainer}
                />
                <div className={cx('pd-tools-eruda')}
                     ref={this.consoleContainer}
                 />
            </div>
        )
    }


}