import * as React from 'react'
import * as cx from 'classnames'

import * as eruda from 'eruda'
import * as erudaTiming from 'eruda-timing'
import * as Stats from 'stats-js'

export default class Monitor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openSetting: false,
            openTools: false
        }
        this.stats = new Stats()
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
            const stats = this.stats
            stats.showPanel(0)
            stats.showPanel(1)
            stats.showPanel(2)
            stats.dom.className = 'programMonitorStatsContent'
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
            tool: ['console', 'timing', 'info'],
            useShadowDom: false
        })
        eruda.add(erudaTiming)
        eruda.show()

        let devTools = document.getElementsByClassName('eruda-dev-tools')[0]
        devTools.style.height = ''
    }

    loop = () => {
        if (this.stats) {
            this.stats.update()
            this.rafID = requestAnimationFrame(this.loop)
        }
    }

    render() {
        return (
            <div className={cx('workshopMonitor')}>
                <div className={cx('programMonitorStats')}
                     ref={this.statsContainer}
                ></div>
                <div className={cx('programEruda')}
                     ref={this.consoleContainer}
                ></div>
            </div>
        )
    }


}