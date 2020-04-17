const program = {
    name: '{NAME}',
    path: '{ROUTE}',
    desc: '{DESC}',
    tags: [{TAGS}],
    cover: require('./cover.jpg'),
    date: '{DATE}',
    asyncModule: () => import('./asyncModule')
}

export default program