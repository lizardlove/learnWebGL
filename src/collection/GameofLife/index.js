const program = {
    name: 'GameofLife',
    path: 'gameoflife',
    desc: 'custom rules game of life, multiplayer online game version.',
    tags: ['canvas', 'game', 'demo'],
    cover: require('./cover.jpg'),
    date: 'Thu Apr 16 2020',
    asyncModule: () => import('./asyncModule')
}

export default program