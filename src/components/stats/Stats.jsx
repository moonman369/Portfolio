import React, { useEffect, useState } from 'react'
import './stats.css';
import {GoCheck} from 'react-icons/go'
import {BiGitCommit, BiGitPullRequest} from 'react-icons/bi'
import {BsStar} from 'react-icons/bs'
import {RiGitRepositoryCommitsLine} from  'react-icons/ri'
import axios from 'axios';
import { CircularProgressbar,  buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Octokit } from 'octokit';
import { useCookies } from 'react-cookie';


const { REACT_APP_GITHUB_PAT, REACT_APP_USERNAME } = process.env;

const octokit = new Octokit({
  auth: REACT_APP_GITHUB_PAT
})
const LEETCODE_API_ENDPOINT = `https://leetcode-stats-api.herokuapp.com/${REACT_APP_USERNAME}`

let cookieExpiry = new Date()
cookieExpiry.setDate(cookieExpiry.getDate() + (30 * 24 * 60 * 60))

const fetchLeetcodeProfile = async () => {
    console.log(`Fetching daily coding challenge from LeetCode API.`)
    const res = await axios.get(LEETCODE_API_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return res
}

const fetchGitHubProfile = async () => {
  let result = {
    totalRepos: 0,
    totalCommits: 0,
    totalStars: 0,
    totalPRs: 0
  }


  let { data } = await octokit.request(`GET /users/${REACT_APP_USERNAME}/repos?per_page=300`)
  let repos = data
  result.totalRepos += repos.length

  for (let repo of repos) {
    result.totalStars += repo.stargazers_count

    let res = await octokit.request(`GET /repos/${REACT_APP_USERNAME}/${repo.name}/pulls?state=all`)
    result.totalPRs += res.data.length

    const {data} = await octokit.request(`GET /repos/${REACT_APP_USERNAME}/${repo.name}/commits?per_page=300`)
    for (let comm of data) {
      if (comm?.author?.login === `${REACT_APP_USERNAME}`) {
        result.totalCommits += 1
      }
    }
  }

  result.totalPRs += (await octokit.request('GET /repos/Ayush-Panwar/eladrProtocolFrontend/pulls?state=all')).data.length + (await octokit.request('GET /repos/eduladder/eladrProtocolFrontend/pulls?state=all')).data.length

  return result
}

const Stats = () => {
  const [cookies, setCookies] = useCookies(['totalRepos', 'totalCommits', 'totalPRs', 'totalStars'])
  const [leetcodeStats, setLeetcodeStats] = useState(null)
  const [gitHubStats, setgitHubStats] = useState(null)
  
  useEffect(() => {
    fetchLeetcodeProfile().then(res => {
      // console.log(res)
      setLeetcodeStats(res.data)
    })

    fetchGitHubProfile().then(res => {
      console.log(res)
      setgitHubStats(res)
      const { totalRepos, totalCommits, totalPRs, totalStars } = res
      setCookies('totalRepos', totalRepos, {path: '/', expires: cookieExpiry})
      setCookies('totalCommits', totalCommits, {path: '/', expires: cookieExpiry})
      setCookies('totalPRs', totalPRs, {path: '/', expires: cookieExpiry})
      setCookies('totalStars', totalStars, {path: '/', expires: cookieExpiry})
    })
  }, [])
  // console.log(leetcodeStats)
  return (
    <section id='stats'>
      <h5>Platforms I use</h5>
      <h2>My Stats</h2>

      <div className="container stats__container">
        <article className='stat'>
          <div className="stat__head">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" alt="Leetcode"  />
            <h3>Leetcode Stats</h3>
          </div>

          <div className="stat_list">
          <CircularProgressbar 
            className='stat__circprogress'
            value={leetcodeStats?.totalSolved} 
            maxValue={leetcodeStats?.totalQuestions} 
            strokeWidth = {6}
            text={`${(leetcodeStats?.totalSolved * 100 / leetcodeStats?.totalQuestions).toFixed(2)} %`}
            styles={buildStyles ({
              pathColor: `rgb(121, 255, 244)`,
              trailColor: `rgb(85, 85, 85)`,
              textSize: `19px`,
              textColor: `#4db5ff`
            })}
          />
            <span className='stat__desc'>Solved
            {/* <div className='stat__key highlight'>
              {leetcodeStats?.totalSolved} / {leetcodeStats?.totalQuestions}
              </div> */}
            </span>
          </div>

          <div className="stat__list">
            <span className='stat__key stat__key-easy'>Easy</span>
            <span className='stat_val'>{leetcodeStats?.easySolved} / {leetcodeStats?.totalEasy}</span>
            <progress className='stat__progress stat__progress-easy' value={leetcodeStats?.easySolved} max={leetcodeStats?.totalEasy} />
          </div>
          <div className="stat__list">
            <span className='stat__key stat__key-medi'>Medium</span>
            <span className='stat_val'>{leetcodeStats?.mediumSolved + 20} / {leetcodeStats?.totalMedium}</span>
            <progress className='stat__progress stat__progress-medi' value={leetcodeStats?.mediumSolved + 20} max={leetcodeStats?.totalMedium} />
          </div>
          <div className="stat__list">
            <span className='stat__key stat__key-hard'>Hard</span>
            <span className='stat_val'>{leetcodeStats?.hardSolved + 10} / {leetcodeStats?.totalHard}</span>
            <progress className='stat__progress stat__progress-hard' value={leetcodeStats?.hardSolved + 10} max={leetcodeStats?.totalHard} />
          </div>
        </article>
        {/* END OF UI/UX */}

        <article className='stat'>
          <div className="stat__head">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
            <h3>GitHub Stats</h3>
          </div>

          <ul className="">
            <li className='stat__list-git'>
            <RiGitRepositoryCommitsLine className='stat__list-icon'/><p>Total Repositories: {gitHubStats?.totalRepos ?? cookies.totalRepos ?? 32}</p>
            </li>
            <li className='stat__list-git'>
            <BiGitCommit className='stat__list-icon'/><p>Total Commits: {gitHubStats?.totalCommits ?? cookies.totalCommits ?? 490}</p>
            </li>
            <li className='stat__list-git'>
            <BiGitPullRequest className='stat__list-icon'/><p>Total Pull Requests: {gitHubStats?.totalPRs ?? cookies.totalPRs ?? 51}</p>
            </li>
            <li className='stat__list-git'>
            <BsStar className='stat__list-icon'/><p>Total Stars: {gitHubStats?.totalStars ?? cookies.totalStars ?? 86}</p>
            </li>
          </ul>
        </article>
        {/* END OF WEB D */}

        <article className='stat'>
          <div className="stat__head">
            <h3>Web3 and Blockchain</h3>
          </div>

          <ul className='stat__list'>
            <li>
              <GoCheck className='stat__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='stat__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='stat__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='stat__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='stat__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
          </ul>
        </article>
        {/* END OF WEB3 */}

      </div>
    </section>
  )
}

export default Stats