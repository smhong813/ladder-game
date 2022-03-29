import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainFooter from '../../components/MainFooter';

import { MdOutlineRefresh } from 'react-icons/md';

import i18n from './i18n.json';
import scssVars from '../../styles/variables.scss';
import styles from './Ladder.module.scss';
import { generateLadder, run } from './algorithm';
import { useSelector } from 'react-redux';
import { selectors as settingSelectors } from '../../store/slices/setting';
import { langSelectors } from '../../store/slices/lang';
import Popup from '../../components/Popup';
import BottomSheet from '../../components/BottomSheet';
import Result from '../Result/Result';

const Ladder = () => {
  const [results, setResults] = useState([]);
  const [xLength, setXLength] = useState(0);
  const [yLength, setYLength] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [map, setMap] = useState(null);
  const [resultVisible, setResultVisible] = useState(false);
  const lang = useSelector(langSelectors.currentLang);

  const navigate = useNavigate();

  const canvasRef = useRef();
  const canvasWidth = window.innerWidth - 24 * 2;
  const canvasHeight = window.innerHeight - 120 - 74 - 40 - 40 - 24;

  const players = useSelector(settingSelectors.player);
  const prizes = useSelector(settingSelectors.prize);
  const lineColors = [
    scssVars['accent-color-1'],
    scssVars['accent-color-2'],
    scssVars['accent-color-3'],
    scssVars['accent-color-5'],
    scssVars['accent-color-6'],
    scssVars['accent-color-4'],
    scssVars['accent-color-7'],
    scssVars['accent-color-8'],
  ];
  const [playerColors, setPlayerColors] = useState({});
  const [prizeColors, setPrizeColors] = useState({});
  const [popup, setPopup] = useState(null);

  const padding = 20;

  const drawLadder = (ctx, map, xLength, yLength) => {
    const height = map.length;
    const width = map[0].length;

    let x = padding;
    let y = 0;

    for (let i = 0; i < width; i++) {
      ctx.strokeStyle = '#000000';
      ctx.beginPath();
      ctx.lineWidth = 1;
      x = padding + Math.floor(i / 2) * xLength;
      y = 0;
      if (i % 2 === 0) {
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + height * yLength);
        ctx.stroke();
      } else {
        for (let j = 0; j < height; j++) {
          if (map[j][i] === 1) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            y = j * yLength;
            ctx.moveTo(x, y);
            ctx.lineTo(x + xLength, y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
      ctx.closePath();
    }
  };

  const calcWaypoints = (vertices) => {
    var waypoints = [];
    for (let i = 1; i < vertices.length; i++) {
      const pt0 = vertices[i - 1];
      const pt1 = vertices[i];
      const dx = pt1.x - pt0.x;
      const dy = pt1.y - pt0.y;
      for (let j = 0; j < 10; j++) {
        const x = pt0.x + (dx * j) / 10;
        const y = pt0.y + (dy * j) / 10;
        waypoints.push({ x: x, y: y });
      }
    }
    waypoints.push(vertices[vertices.length - 1]);
    return waypoints;
  };

  let t = 1;
  let points;
  let index;

  const animate = () => {
    if (t < points.length - 1) {
      requestAnimationFrame(animate);
    } else {
      setPrizeColors({
        ...prizeColors,
        [results[index].rewardIndex]: lineColors[index],
      });
      setPopup(results[index]);
    }
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineWidth = 3;
    ctx.strokeStyle = lineColors[currentPlayer];
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(points[t - 1].x, points[t - 1].y);
    ctx.lineTo(points[t].x, points[t].y);
    ctx.stroke();
    t++;
  };

  const drawPaths = (paths, idx) => {
    const vertices = paths.map((item) => ({
      x: padding + (item.y / 2) * xLength,
      y: item.x * yLength,
    }));
    points = calcWaypoints(vertices);
    index = idx;
    animate();
  };

  const go = (index) => {
    setCurrentPlayer(index);
  };

  useEffect(() => {
    if (players.length > 0) {
      if (currentPlayer != null && results.length > 0) {
        setPlayerColors({
          ...playerColors,
          [currentPlayer]: lineColors[currentPlayer],
        });
        drawPaths(results[currentPlayer].history, currentPlayer);
      }
    }
  }, [currentPlayer]);

  useEffect(() => {
    if (!players || players.length < 2) {
      return;
    }
    const map = generateLadder(players.length);
    setMap(map);
    setResults(run(players, prizes, map));

    const xLength = (canvasWidth - padding * 2) / (players.length - 1);
    const yLength = canvasHeight / (map.length - 1);
    setXLength(xLength);
    setYLength(yLength);

    const canvasContext = canvasRef.current.getContext('2d');
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
    drawLadder(canvasContext, map, xLength, yLength);

    const playerColors = {};
    for (let i = 0; i < players.length; i++) {
      playerColors.i = '#dddddd';
    }
    setPlayerColors(playerColors);
    setPrizeColors(playerColors);
  }, [players]);

  return (
    <>
      <main className='page'>
        {players.length < 2 && (
          <div className={styles.empty}>Please set players and rewards</div>
        )}
        <div className={styles.playerList}>
          {players.map((player, index) => (
            <button
              key={`${player}-${index}`}
              className={styles.player}
              onClick={() => go(index)}
              style={{ backgroundColor: playerColors[index] }}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width={canvasWidth}
          height={canvasHeight}
        />
        <div className={styles.prizeList}>
          {prizes.map((prize, index) => (
            <button
              key={`${prize}-${index}`}
              className={styles.prize}
              onClick={() => setPopup(results[index])}
              style={{ backgroundColor: prizeColors[index] }}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <MainFooter
          mainBtnTitle={i18n.footer.results[lang]}
          mainBtnOnClick={() => {
            setResultVisible(true);
          }}
          subBtnIcon={
            <MdOutlineRefresh size='1.6rem' color={scssVars['primary-color']} />
          }
          subBtnOnClick={() => {
            navigate(-1);
          }}
          showCount={false}
          disabled={players.length < 2}
        />
      </main>
      {popup && (
        <Popup onClose={() => setPopup(null)}>
          <div className={styles.popup}>
            <h1 className={styles.popupTitle}>{popup?.player}</h1>
            <h2
              className={styles.popupDescription}
              style={{ color: lineColors[popup?.playerIndex] }}
            >
              {popup?.reward}
            </h2>
          </div>
        </Popup>
      )}
      {resultVisible && (
        <BottomSheet onClose={() => setResultVisible(false)}>
          <Result results={results} colors={lineColors} />
        </BottomSheet>
      )}
    </>
  );
};

export default Ladder;
