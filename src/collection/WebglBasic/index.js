const program = {
    name: 'SolarSystem',
    path: 'solarSystem',
    desc: 'solar system by three.js',
    tags: ['webgl', 'threeJs'],
    cover: require('./cover.png'),
    date: 'Tue Apr 21 2020',
    asyncModule: () => import('./asyncModule')
}

export default program