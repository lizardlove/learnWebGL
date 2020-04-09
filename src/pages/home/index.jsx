import * as React from 'react'
import * as cx from 'classnames'

import { Link } from 'react-router-dom'
import { TagsOutlined, GithubOutlined, TwitterOutlined, MailOutlined } from '@ant-design/icons'

import "./base.less"

import { Card } from '../../components'

import { programs, tags } from "../../routes"
import user from '../../user.config'
import program from '../../collection/test'

const Home = () => (
    <div className={cx('workshopHome')}>
        <div className="homePad">
            <div className={cx('headline')}>
                <Link 
                    to={`/workshop/${programs[0].path}`} 
                    className={cx('headlineCover')} 
                    style={{backgroundImage: `url(${programs[0].cover.default})`}}>
                    <p>
                        {`${programs[0].name} `}&nbsp;
                        <span>{programs[0].desc}</span>
                    </p>
                </Link>
            </div>
            <div className={cx('resume')}>
                <div className={cx('resumeAvater')}>
                    <img src={user.avater.default} alt={user.name}/>
                    <p className={cx('author')}>{user.name}</p>
                    <p className={cx('desc')}>{user.desc}</p>
                </div>
                <div className={cx('resumeLinks')}>
                    <span className={cx('linkItem')} alt="Github">
                        <a href={user.social.Github}>
                            <GithubOutlined />
                        </a>
                    </span>
                    <span className={cx('linkItem')} alt="Twitter">
                        <a href={user.social.Twitter}>
                            <TwitterOutlined />
                        </a>
                    </span>
                    <span className={cx('linkItem')} alt="Gmail">
                        <a href={user.social.Gmail}>
                            <MailOutlined />
                        </a>
                    </span>
                </div>
                <nav className={cx('summary')}>
                    <div className={cx('summaryItem')}>
                        <p>{programs.length}</p>
                        <p>Programs</p>
                    </div>
                    <Link to="/search?tags" className={cx('summaryItem')}>
                        <p>{tags.length}</p>
                        <p>Tags</p>
                    </Link>
                </nav>
                <div className={cx('recommendation')}>
                    {
                        tags.map((tag,i) => {
                            if (i < 5) {
                                return (
                                    <Link className={cx('hotTag')} to={`/search?tags&${tag}`} key={tag}><TagsOutlined />{tag}</Link>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
        <div className={cx('baseList')}>
            {programs.map(item => (
                <Card data={item} />
            ))}
        </div>
    </div>
)

export default Home