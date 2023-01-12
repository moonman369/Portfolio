import React, { useEffect, useState } from 'react'
import './stats.css';
import {GoCheck} from 'react-icons/go'
import axios from 'axios';

const LEETCODE_API_ENDPOINT = `https://leetcode-stats-api.herokuapp.com/moonman369`
// const endpt = 'http://localhost:8000/graphql'
// const QUERY = `
//   query userProblemsSolved($username: String!) {
//     allQuestionsCount {
//       difficulty
//       count
//     }
//     matchedUser(username: $username) {
//       problemsSolvedBeatsStats {
//         difficulty
//         percentage
//       }
//       submitStatsGlobal {
//         acSubmissionNum {
//           difficulty
//           count
//         }
//       }
//     }
//   }`



// const VARIABLES = {variables: 'moonman369'}
// const body = {"query":"\n    query userProblemsSolved($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    problemsSolvedBeatsStats {\n      difficulty\n      percentage\n    }\n    submitStatsGlobal {\n      acSubmissionNum {\n        difficulty\n        count\n      }\n    }\n  }\n}\n    ","variables":{"username":"moonman369"}}
// {
//   query: QUERY,
//   variables: VARIABLES
// }


const fetchLeetcodeProfile = async () => {
    console.log(`Fetching daily coding challenge from LeetCode API.`)
    const res = await axios.get(LEETCODE_API_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // const res = await axios.post(endpt, body, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // })
    return res
}

const Stats = () => {
  const [leetcodeStats, setLeetcodeStats] = useState(null)
  // const [easySolved, setEasySolved] = useState(0)
  // const [mediumTotal, setMediumTotal] = useState(0)
  // const [mediumSolved, setMediumSolved] = useState(0)
  // const [hardTotal, setHardTotal] = useState(0)
  // const [hardSolved, setHardSolved] = useState(0)
  // const [rank, setRank] = useState(0)
  useEffect(() => {
    fetchLeetcodeProfile().then(res => {
      console.log(res)
      // setTest(JSON.stringify(res.data))
      setLeetcodeStats(res.data)
    })
  }, [])
  console.log(leetcodeStats)
  return (
    <section id='stats'>
      <h5>Platforms I use</h5>
      <h2>My Stats</h2>

      <div className="container stats__container">
        <article className='stat'>
          <div className="stat__head">
            <h3>Leetcode Stats</h3>
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
            <h3>Web Development</h3>
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