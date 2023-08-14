import React, { useEffect, useRef, useState } from "react";
import useInterval from "@use-it/interval";

// Constants
const VALID_CHARS = `アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+~}{|:?><''\"`;
const STREAM_MUTATION_ODDS = 0.05;

const MIN_STREAM_SIZE = 20;
const MAX_STREAM_SIZE = 60;

const MIN_INTERVAL_DELAY = 40;
const MAX_INTERVAL_DELAY = 90;

const MIN_DELAY_BETWEEN_STREAMS = 0;
const MAX_DELAY_BETWEEN_STREAMS = 8000;

const getRandInRange = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

const getRandChar = () =>
  VALID_CHARS.charAt(Math.floor(Math.random() * VALID_CHARS.length));

const getRandStream = () =>
  new Array(getRandInRange(MIN_STREAM_SIZE, MAX_STREAM_SIZE))
    .fill()
    .map((_) => getRandChar());

const getMutatedStream = (stream) => {
  const newStream = [];
  for (let i = 1; i < stream.length; i++) {
    if (Math.random() < STREAM_MUTATION_ODDS) {
      newStream.push(getRandChar());
    } else {
      newStream.push(stream[i]);
    }
  }
  newStream.push(getRandChar());
  return newStream;
};

const RainStream = (props) => {
  const [stream, setStream] = useState(getRandStream());
  const [topPadding, setTopPadding] = useState(stream.length * -20);
  const [intervalDelay, setIntervalDelay] = useState(null);

  // Initialize intervalDelay
  useEffect(() => {
    setTimeout(() => {
      setIntervalDelay(getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY));
    }, getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS));
  }, []);

  useInterval(() => {
    if (!props.height) return;

    if (!intervalDelay) return;

    // If stream is off the screen, reset it after timeout
    if (topPadding > props.height) {
      setStream([]);
      const newStream = getRandStream();
      setStream(newStream);
      setTopPadding(newStream.length * -30);
      setIntervalDelay(null);
      setTimeout(
        () =>
          setIntervalDelay(
            getRandInRange(MIN_INTERVAL_DELAY, MAX_INTERVAL_DELAY)
          ),
        getRandInRange(MIN_DELAY_BETWEEN_STREAMS, MAX_DELAY_BETWEEN_STREAMS)
      );
    } else {
      setTopPadding(topPadding + 50);
    }
    // setStream(stream => [...stream.slice(1, stream.length), getRandChar()]);
    setStream(getMutatedStream);
  }, intervalDelay);

  return (
    <div
      style={{
        fontFamily: "matrixFont",
        color: "#20c20e",
        writingMode: "vertical-rl",
        textOrientation: "upright",
        userSelect: "none",
        whiteSpace: "nowrap",
        marginTop: topPadding,
        marginLeft: -12,
        marginRight: -12,
        textShadow: "0px 0px 8px rgba(75, 213, 255, 1)",
        fontSize: 20,
      }}
    >
      {stream.map((char, index) => (
        <a
          style={{
            marginTop: -5,
            // Reduce opacity for last chars
            opacity: index < stream.length - 5 ? 0.1 + index * 0.15 : 1,
            color: index === stream.length - 1 ? "#fff" : undefined,
            textShadow:
              index === stream.length - 1
                ? "0px 10px 30px rgb(226, 248, 255)"
                : undefined,
          }}
        >
          {char}
        </a>
      ))}
    </div>
  );
};

const MatrixRain = (props) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState(null); // ?{width, height}

  useEffect(() => {
    const boundingClientRect = containerRef.current.getBoundingClientRect();
    setContainerSize({
      width: boundingClientRect.width,
      height: boundingClientRect.height,
    });
  }, []);

  const streamCount = containerSize ? Math.floor(window.innerWidth / 50) : 0;

  return (
    <div
      className={props.customClass}
      style={{
        background: "rgba(0, 0, 0, 0.5)",
        backgroundImage: "url(../src/assets/bg-texture.png)",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: "ignore",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        transition: "all 1000ms",
      }}
      ref={containerRef}
    >
      {new Array(streamCount).fill().map((_) => (
        <>
          <RainStream height={containerSize?.height} />
          <RainStream height={containerSize?.height} />
          <RainStream height={containerSize?.height} />
        </>
      ))}
    </div>
  );
};

export default MatrixRain;
