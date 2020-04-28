import * as React from 'react'
import * as cx from 'classnames'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


import './base.less'
import { Side } from 'three'

export default class Demo extends React.Component {
    constructor(props) {
        super(props)

        this.container = React.createRef()
        this.scene
        this.camera
        this.renderer
        this.controls
        this.meshs = []
        this.renderFlag = false
    }

    componentDidMount() {
        const dom = this.container.current
        dom.style.width = `${window.innerWidth}px`
        dom.style.height = `${window.innerHeight}px`
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.container.current,
            antialias: true
        })
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000000);
        this.scene = new THREE.Scene() 
        this.controls = new OrbitControls(this.camera, this.container.current)

        window.addEventListener('resize', this.handleResize)
        this.handleResize()
        this.initScene()
        this.loop(0)
    }

    handleResize = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        this.camera.aspect = width / height
        this.camera.updateProjectionMatrix()
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(width, height)
    }
    initScene = () => {

        const sphereLight = new THREE.HemisphereLight(0xbd8f49, 0x000000, .8)
        const ambientLight = new THREE.AmbientLight(0xdcde95, .5)
        const pointLight = new THREE.PointLight(0xbd8f49, 1)
        this.scene.add(sphereLight)
        this.scene.add(ambientLight)
        this.scene.add(pointLight)
        
        this.camera.position.set(1000, 1000, 1000)
        this.camera.lookAt(0,0,0)

        this.createContent()

    }
    createContent = () => {
        this.config = {
            radius: [350000, 2440, 6073, 6378, 3397, 71492, 60000, 25559, 24750],
            orbitRadius: [0, 0.3871, 0.7233, 1, 1.5237, 6.203, 10.539, 20.218, 31.0579],
            color: [0xffffff, 0x968257, 0xffffff, 0x515bc9, 0xa62d2d, 0xb5aa43, 0x827a33, 0x82d9a3, 0x5d94c2]
        }
        const au = 149159 /2, baseUnit = 637.8
        let solarList = this.config.radius.map((r, i) => {
            return this.createPlanet(r / baseUnit, this.config.color[i])
        })
        this.solarSystem = new THREE.Object3D()
        this.scene.add(this.solarSystem)
        solarList.forEach( (planet,i) => {
            if (i != 0) {
                let orbitInstance = this.createPlanet(1, 0xffffff)
                let orbit = new THREE.Object3D()
                orbitInstance.position.set(0,0,0)

                let orbitRadius = this.config.orbitRadius[i] * (au / baseUnit) + this.config.radius[0] / baseUnit
                planet.position.x = orbitRadius*Math.cos((Math.PI / 4)*i)
                planet.position.z = orbitRadius*Math.sin((Math.PI / 4)*i)
                orbit.add(solarList[0])
                orbit.add(planet)
                this.meshs.push(orbit)
                this.solarSystem.add(orbit)

            } else {
                this.meshs.push(planet)
                this.solarSystem.add(planet)
            }
        })

    }
    createPlanet(radius, color) {
        let planetGeometry = new THREE.SphereGeometry(radius, 64, 64)
        let planetMaterial = new THREE.MeshPhongMaterial({
            color: color,
            shading: THREE.FlatShading,
            side: THREE.DoubleSide,
            emissive: 0x112244
        })

        return new THREE.Mesh(planetGeometry, planetMaterial)
    }
    update = (time) => {
        this.meshs.forEach( (item, i) => {
            let scale = this.config.orbitRadius[i] ? this.config.orbitRadius[i] : 1
            item.rotation.y = time* 0.0001 / scale
        })
        this.renderer.render(this.scene, this.camera)
    }
    loop = (time) => {
        this.update(time)
        requestAnimationFrame(this.loop)
    }
    render() {
        return (
            <div className={cx('view', 'viewWebglBasic')}>
                <canvas ref={this.container} />
            </div>
        )
    }
}