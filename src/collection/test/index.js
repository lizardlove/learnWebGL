const program = {
    name: 'Test',
    path: 'test',
    desc: '页面测试',
    tags: ['demo'],
    cover: require('./cover.png'),
    date: '2020/03/29',
    asyncModule: () => import('./asyncModule')
}

export default program