import React, { useEffect, useState } from 'react'
import './stats.css';
import {GoCheck} from 'react-icons/go'
import {GrCertificate} from 'react-icons/gi'
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
  const [cookies, setCookies] = useCookies({'totalRepos': 0, 'totalCommits': 0, 'totalPRs': 0, 'totalStars': 0})
  const [leetcodeStats, setLeetcodeStats] = useState(null)
  const [gitHubStats, setgitHubStats] = useState(null)
  const [gitCardSvg, setGitCardSvg] = useState('')
  
  useEffect(() => {
    fetchLeetcodeProfile().then(res => {
      // console.log(res)
      setLeetcodeStats(res.data)
    })

    fetchGitHubProfile().then(res => {
      console.log(res)
      setgitHubStats(res)
      const { totalRepos, totalCommits, totalPRs, totalStars } = res
      setCookies('totalRepos', totalRepos, {path: '/', expires: cookieExpiry, priority: 'High'})
      setCookies('totalCommits', totalCommits, {path: '/', expires: cookieExpiry, priority: 'High'})
      setCookies('totalPRs', totalPRs, {path: '/', expires: cookieExpiry, priority: 'High'})
      setCookies('totalStars', totalStars, {path: '/', expires: cookieExpiry, priority: 'High'})
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
            strokeWidth = {5}
            text={`${(leetcodeStats?.totalSolved * 100 / leetcodeStats?.totalQuestions).toFixed(2)} %`}
            styles={buildStyles ({
              pathColor: `rgb(121, 255, 244)`,
              trailColor: `rgb(85, 85, 85)`,
              textSize: `19px`,
              textColor: `#4db5ff`
            })}
          />
            <span className='stat__desc'><span className='stat__desc-sp'>Solved&nbsp;</span><p className='stat__key-total'> {leetcodeStats?.totalSolved}</p>
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
            <RiGitRepositoryCommitsLine className='stat__list-icon repo-icon'/><p>Total Repositories: <span className="stat__key repos">{gitHubStats?.totalRepos ?? cookies?.totalRepos ?? 0}</span></p>
            </li>
            <li className='stat__list-git'>
            <BiGitCommit className='stat__list-icon commit-icon'/><p>Total Commits: <span className='stat__key commits'>{gitHubStats?.totalCommits ?? cookies?.totalCommits ?? 0}</span></p>
            </li>
            <li className='stat__list-git'>
            <BiGitPullRequest className='stat__list-icon pr-icon'/><p>Total Pull Requests: <span className='stat__key prs'>{gitHubStats?.totalPRs ?? cookies?.totalPRs ?? 0}</span></p>
            </li>
            <li className='stat__list-git'>
            <BsStar className='stat__list-icon star-icon'/><p>Total Stars: <span className='stat__key stars'>{gitHubStats?.totalStars ?? cookies?.totalStars ?? 0}</span></p>
            </li>
          </ul>
          <img className='vercel__card' src="https://camo.githubusercontent.com/5c6c17871e39850f232c9cb046b3b88a9639a6c39d1131a4dbaac3a35c51d771/687474703a2f2f6769746875622d70726f66696c652d73756d6d6172792d63617264732e76657263656c2e6170702f6170692f63617264732f7265706f732d7065722d6c616e67756167653f757365726e616d653d6d6f6f6e6d616e333639267468656d653d7261646963616c" alt="GitHub Stats Card" />
        </article>
        {/* END OF WEB D */}

        <article className='stat'>
          <div className="stat__head">
            <img src="https://cdn-icons-png.flaticon.com/512/2258/2258567.png" alt="Certificates" />
            <h3>Certificates</h3>
          </div>

          <ul className='stat__list'>
            <li>
              <GoCheck className='stat__list-icon'/>
              <a href="https://drive.google.com/file/d/1ES_DxKzGUVjq6SHY50Wmw2rGZKP_2AJK/view?usp=sharing" target='_blank'>Internship Completion at W3 Dev Private Limited</a>
            </li>
            <li>
              <GoCheck className='stat__list-icon'/>
              <a href='https://drive.google.com/file/d/1ES_DxKzGUVjq6SHY50Wmw2rGZKP_2AJK/view?usp=sharing' target='_blank'>Letter of Recommendation from W3 Dev Private Limited</a>
            </li>
            <li>
              <GoCheck className='stat__list-icon'/>
              <a href='https://drive.google.com/file/d/1tnS2bd_6f_PDUB8J4xePtsIpWVTIYjRN/view?usp=sharing' target='_blank'>Google + Cousera Certificate Crash Course on Python</a>
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