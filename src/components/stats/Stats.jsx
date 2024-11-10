import React, { useEffect, useState } from "react";
import "./stats.css";
import { MdWorkOutline } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { FaHackerrank } from "react-icons/fa";
import { BiGitCommit, BiGitPullRequest } from "react-icons/bi";
import { BsStar } from "react-icons/bs";
import { IoLogoGoogle } from "react-icons/io";
import { SiEthereum, SiHiveBlockchain } from "react-icons/si";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Octokit } from "octokit";
import { useCookies } from "react-cookie";

const {
  REACT_APP_GITHUB_PAT,
  REACT_APP_USERNAME,
  REACT_APP_API_KEY,
  REACT_APP_PORTFOLIO_API_HOSTNAME,
  REACT_APP_PORTFOLIO_API_LEETCODE_ENDPOINT,
  REACT_APP_PORTFOLIO_API_GITHUB_ENDPOINT,
} = process.env;

const octokit = new Octokit({
  auth: REACT_APP_GITHUB_PAT,
});
const LEETCODE_API_ENDPOINT = `${REACT_APP_PORTFOLIO_API_HOSTNAME}${REACT_APP_PORTFOLIO_API_LEETCODE_ENDPOINT}${REACT_APP_USERNAME}`;
const GITHUB_API_ENDPOINT = `${REACT_APP_PORTFOLIO_API_HOSTNAME}${REACT_APP_PORTFOLIO_API_GITHUB_ENDPOINT}${REACT_APP_USERNAME}`;
const GEOLOCATION_API_ENDPOINT = `https://ipgeolocation.abstractapi.com/v1/?api_key=${REACT_APP_API_KEY}`;

let cookieExpiry = new Date();
cookieExpiry.setDate(cookieExpiry.getDate() + 30 * 24 * 60 * 60);

const fetchLeetcodeProfile = async () => {
  console.log(`Fetching User Stats using LeetCode API...`);
  const res = await axios.get(LEETCODE_API_ENDPOINT, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Leetcode API call status: Success!");
  // console.log(res?.ipAddress);
  return res;
};

const fetchGeolocation = async () => {
  const res = await axios.get(GEOLOCATION_API_ENDPOINT);
  console.log(res.data);
};

const fetchGitHubProfile = async () => {
  let result = {
    totalRepos: 0,
    totalCommits: 0,
    totalStars: 0,
    totalPRs: 0,
  };

  console.log("Fetching User Data using GitHub API...");

  const res = await axios.get(GITHUB_API_ENDPOINT, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(res.data);

  result.totalRepos = res?.data[0]?.stats.repos;
  result.totalCommits = res?.data[0]?.stats.commits;
  result.totalStars = res?.data[0]?.stats.stars;
  result.totalPRs = res?.data[0]?.stats.pulls;

  console.log("GitHub API call status: Success!");

  return result;
};

const Stats = () => {
  const [cookies, setCookies] = useCookies({
    totalRepos: 0,
    totalCommits: 0,
    totalPRs: 0,
    totalStars: 0,
    leetcodeCookie: "",
  });
  const [leetcodeStats, setLeetcodeStats] = useState({});
  const [gitHubStats, setGitHubStats] = useState({});

  useEffect(() => {
    fetchLeetcodeProfile().then((res) => {
      // console.log(cookies.leetcodeCookie)
      setLeetcodeStats(res.data);
      setCookies("leetcodeCookie", JSON.stringify(res.data), {
        path: "/",
        expires: cookieExpiry,
        priority: "High",
      });
    });

    fetchGitHubProfile().then((res) => {
      // console.log(res)
      setGitHubStats(res);
      const { totalRepos, totalCommits, totalPRs, totalStars } = res;
      setCookies("totalRepos", totalRepos, {
        path: "/",
        expires: cookieExpiry,
        priority: "High",
      });
      setCookies("totalCommits", totalCommits, {
        path: "/",
        expires: cookieExpiry,
        priority: "High",
      });
      setCookies("totalPRs", totalPRs, {
        path: "/",
        expires: cookieExpiry,
        priority: "High",
      });
      setCookies("totalStars", totalStars, {
        path: "/",
        expires: cookieExpiry,
        priority: "High",
      });
    });

    fetchGeolocation();
  }, []);

  return (
    <section id="stats">
      <h5>Platforms I use</h5>
      <h2>My Stats</h2>

      <div className="container stats__container">
        <article className="stat">
          <div className="stat__head">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
              alt="Leetcode"
            />
            <h3>Leetcode Stats</h3>
          </div>

          <div className="stat_list">
            <CircularProgressbar
              className="stat__circprogress"
              value={leetcodeStats?.totalSolved ?? 0}
              maxValue={leetcodeStats?.totalQuestions ?? 0}
              strokeWidth={5}
              text={`${(
                ((leetcodeStats?.totalSolved ?? 0) * 100) /
                (leetcodeStats?.totalQuestions ?? 1)
              ).toFixed(2)} %`}
              styles={buildStyles({
                pathColor: `rgb(121, 255, 244)`,
                trailColor: `rgb(85, 85, 85)`,
                textSize: `19px`,
                textColor: `#4db5ff`,
              })}
            />
            <span className="stat__desc">
              <span>
                <span className="stat__desc-sp">Solved&nbsp;</span>
                <span className="stat__key-total">
                  {" "}
                  {leetcodeStats?.totalSolved}
                </span>
              </span>
              <span>
                <span className="stat__desc-sp">Rank&nbsp;</span>
                <span className="stat__key-rank">{leetcodeStats?.ranking}</span>
              </span>
            </span>
          </div>

          <div className="stat__list">
            <span className="stat__key stat__key-easy">Easy</span>
            <span className="stat_val">
              {leetcodeStats?.easySolved ?? 0} / {leetcodeStats?.totalEasy ?? 0}
            </span>
            <progress
              className="stat__progress stat__progress-easy"
              value={leetcodeStats?.easySolved}
              max={leetcodeStats?.totalEasy}
            />
          </div>
          <div className="stat__list">
            <span className="stat__key stat__key-medi">Medium</span>
            <span className="stat_val">
              {leetcodeStats?.mediumSolved ??
                cookies.leetcodeCookie?.mediumSolved ??
                0}{" "}
              /{" "}
              {leetcodeStats?.totalMedium ??
                cookies.leetcodeStats?.totalMedium ??
                0}
            </span>
            <progress
              className="stat__progress stat__progress-medi"
              value={leetcodeStats?.mediumSolved}
              max={leetcodeStats?.totalMedium}
            />
          </div>
          <div className="stat__list">
            <span className="stat__key stat__key-hard">Hard</span>
            <span className="stat_val">
              {leetcodeStats?.hardSolved ?? 0} / {leetcodeStats?.totalHard ?? 0}
            </span>
            <progress
              className="stat__progress stat__progress-hard"
              value={leetcodeStats?.hardSolved}
              max={leetcodeStats?.totalHard}
            />
          </div>
        </article>
        {/* END OF UI/UX */}

        <article className="stat">
          <div className="stat__head">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
            />
            <h3>GitHub Stats</h3>
          </div>

          <ul className="">
            <li className="stat__list-git">
              <RiGitRepositoryCommitsLine className="stat__list-icon repo-icon" />
              <p>
                Total Repositories:{" "}
                <span className="stat__key repos">
                  {gitHubStats?.totalRepos ?? cookies?.totalRepos ?? 0}
                </span>
              </p>
            </li>
            <li className="stat__list-git">
              <BiGitCommit className="stat__list-icon commit-icon" />
              <p>
                Total Commits:{" "}
                <span className="stat__key commits">
                  {gitHubStats?.totalCommits ?? cookies?.totalCommits ?? 0}
                </span>
              </p>
            </li>
            <li className="stat__list-git">
              <BiGitPullRequest className="stat__list-icon pr-icon" />
              <p>
                Total Pull Requests:{" "}
                <span className="stat__key prs">
                  {gitHubStats?.totalPRs ?? cookies?.totalPRs ?? 0}
                </span>
              </p>
            </li>
            <li className="stat__list-git">
              <BsStar className="stat__list-icon star-icon" />
              <p>
                Total Stars:{" "}
                <span className="stat__key stars">
                  {gitHubStats?.totalStars ?? cookies?.totalStars ?? 0}
                </span>
              </p>
            </li>
          </ul>
          <img
            className="vercel__card"
            src="https://camo.githubusercontent.com/171ec0a33d18cefd823982b66aa7142318219fd9b3c6bac72e553d04802680e3/687474703a2f2f6769746875622d70726f66696c652d73756d6d6172792d63617264732e76657263656c2e6170702f6170692f63617264732f73746174733f757365726e616d653d6d6f6f6e6d616e333639267468656d653d6d69646e696768745f707572706c65"
            alt="GitHub Stats Card"
          />
        </article>
        {/* END OF WEB D */}

        <article className="stat">
          <div className="stat__head">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2258/2258567.png"
              alt="Certificates"
            />
            <h3>Certificates</h3>
          </div>

          <ul className="stat__list">
            <li>
              <MdWorkOutline className="stat__list-icon-certificate intern" />
              <a
                href="https://drive.google.com/file/d/1BPcUwBleZGfb2CM5jZ7NM4MyX3EQo4Xg/view?usp=sharing"
                target="_blank"
              >
                Internship, W3 Dev Private Limited <FiExternalLink />
              </a>
            </li>
            <li>
              <SiHiveBlockchain className="stat__list-icon-certificate block" />
              <a
                href="https://drive.google.com/file/d/1vssY0bkRWdwDYN4zfTTFFGO5UIwgJwB8/view?usp=share_link"
                target="_blank"
              >
                Blockchain Course, Udemy <FiExternalLink />
              </a>
            </li>
            <li>
              <IoLogoGoogle className="stat__list-icon-certificate goog" />
              <a
                href="https://drive.google.com/file/d/1tnS2bd_6f_PDUB8J4xePtsIpWVTIYjRN/view?usp=sharing"
                target="_blank"
              >
                Google, Crash Course on Python <FiExternalLink />
              </a>
            </li>
            <li>
              <IoLogoGoogle className="stat__list-icon-certificate goog" />
              <a
                href="https://drive.google.com/file/d/1es2hoYVWtfhLeZi0x6pYm9B4xHT2d2aL/view?usp=share_link"
                target="_blank"
              >
                Google, Python Scripting and OS <FiExternalLink />
              </a>
            </li>
            <li>
              <SiEthereum className="stat__list-icon-certificate eth" />
              <a
                href="https://drive.google.com/file/d/1BsXQvH0jC0cmdQ-e9Bf0ltsnhZPIDFL7/view?usp=share_link"
                target="_blank"
              >
                Ethereum and Solidity, Udemy <FiExternalLink />
              </a>
            </li>
            <li>
              <FaHackerrank className="stat__list-icon-certificate hack" />
              <a
                href="https://drive.google.com/file/d/1SCv2ieIrKY7VGU2ZPU-jdUrhE1E1AnnX/view?usp=share_link"
                target="_blank"
              >
                Python Skill Assessment, HackerRank <FiExternalLink />
              </a>
            </li>
          </ul>
        </article>
        {/* END OF WEB3 */}
      </div>
    </section>
  );
};

export default Stats;
