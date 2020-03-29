import * as React from 'react'

import config from './collection'

export const programs = []
export const tagsTable = {}

config.sort((item1, item2) => new Date(item1.date) < new Date(item2.date) ? 1 : -1).forEach(program => {
    const {
        name,
        path,
        desc,
        tags,
        cover,
        date,
        author,
        asyncModule
    } = program;

    const item = {
        name,
        desc,
        path,
        tags,
        cover,
        date: (new Date(date)).toDateString(),
        author: author || {name: 'Pipiper', email: 'xiyiailoli@gmail.com'},
        asyncModule
    }
    programs.push(item)

    tags.forEach(tag => {
        if (!tagsTable[tag]) {
            tagsTable[tag] = []
        }

        tagsTable[tag].push(item)
    })
})

export const tags = Object.keys(tagsTable).sort()