import React, { useState } from 'react'
import './services.css';
import {GoCheck} from 'react-icons/go'
import axios from 'axios';

const LEETCODE_API_ENDPOINT = `https://leetcode-stats-api.herokuapp.com/${process.env.LEETCODE_USERNAME}`
// const DAILY_CODING_CHALLENGE_QUERY = `
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


const fetchLeetcodeProfile = async () => {
    console.log(`Fetching daily coding challenge from LeetCode API.`)
    const res = await axios.get(LEETCODE_API_ENDPOINT, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
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
              <p>{test}</p>
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