import React, { useState } from 'react'
import './services.css';
import {GoCheck} from 'react-icons/go'
import axios from 'axios';

const LEETCODE_API_ENDPOINT = `https://leetcode-stats-api.herokuapp.com/${process.env.LEETCODE_USERNAME}`
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

const Services = () => {
  const [test, setTest] = useState('')
  fetchLeetcodeProfile().then(res => {
    console.log(res)
    // setTest(JSON.stringify(res.data))
  })
  
  return (
    <section id='services'>
      <h5>What I Offer</h5>
      <h2>Services</h2>

      <div className="container services__container">
        <article className='service'>
          <div className="service__head">
            <h3>UI/UX Design</h3>
          </div>

          <ul className='service__list'>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
          </ul>
        </article>
        {/* END OF UI/UX */}

        <article className='service'>
          <div className="service__head">
            <h3>Web Development</h3>
          </div>

          <ul className='service__list'>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
          </ul>
        </article>
        {/* END OF WEB D */}

        <article className='service'>
          <div className="service__head">
            <h3>Web3 and Blockchain</h3>
          </div>

          <ul className='service__list'>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
            <li>
              <GoCheck className='service__list-icon'/>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </li>
          </ul>
        </article>
        {/* END OF WEB3 */}

      </div>
    </section>
  )
}

export default Services