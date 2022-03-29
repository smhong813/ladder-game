const verifyMap = (map) => {
  const width = map[0].length;
  const height = map.length;

  const hasLineAtLeastOne = Array(width).fill(false);

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (map[j][i] === 1) {
        hasLineAtLeastOne[i] = true;
        // TODO: break and go to outer for-loop
      }
    }
  }

  return !hasLineAtLeastOne.includes(false);
};

export const generateLadder = (numberOfPlayers) => {
  const width = numberOfPlayers * 2 - 1;
  const height = numberOfPlayers > 4 ? numberOfPlayers * 2 : 10;

  const map = [];
  const row = [];
  for (let i = 0; i < width; i++) {
    row.push(i % 2 === 0 ? 1 : 0);
  }
  for (let i = 0; i < height; i++) {
    map.push([...row]);
  }

  //   console.table(map);

  const lineMap = Array(height - 2)
    .fill()
    .map(() => Array(numberOfPlayers - 1).fill(0));
  // const maxX = lineMap[0].length;
  const maxX = numberOfPlayers - 1;
  const maxY = lineMap.length;

  do {
    for (let i = 0; i < maxY; i++) {
      for (let j = 0; j < maxX; j++) {
        if (lineMap[i][Math.max(0, j - 1)] === 1) {
          continue;
        }

        if (lineMap[Math.max(0, i - 1)][j] === 1) {
          continue;
        }

        lineMap[i][j] = Math.random() < 0.5 ? 0 : 1;
      }
    }
    // console.log('verified:', verifyMap(lineMap));
  } while (!verifyMap(lineMap));
  //   console.table(lineMap);

  // TODO: Put lineMap into map
  for (let i = 0; i < maxY; i++) {
    for (let j = 0; j < maxX; j++) {
      // console.log(`lineMap[${i}][${j}]: ${lineMap[i][j]}`);
      map[i + 1][j * 2 + 1] = lineMap[i][j];
      // console.log(`map[${i + 1}][${j * 2 + 1}]: ${map[i + 1][j * 2 + 1]}`);
    }
  }

  console.log('Final MAP!');
  console.table(map);
  return map;
};

const getNextCoord = (x, y, map) => {
  // console.log(`x: ${x}, y: ${y}`);

  let newCoord = { x, y };
  let goDown = false;

  //   console.log(`[${x}][${y}]: ${map[x][y]}`);
  if (y - 1 >= 0 && map[x][y - 1] === 1) {
    newCoord.y -= 2;
    goDown = true;
  } else if (map[x][y + 1] === 1) {
    newCoord.y += 2;
    goDown = true;
  } else if (x + 1 < map.length && map[x + 1][y] === 1) {
    newCoord.x += 1;
  }

  return [newCoord, goDown];
};

const displayHistory = (history) => {
  history.forEach((item) => {
    console.log(`[${item.x}][${item.y}]`);
  });
};

export const run = (players, rewards, map) => {
  const result = [];
  for (let i = 0; i < players.length; i++) {
    const playerOrder = i;
    const userCoord = { x: 0, y: 2 * playerOrder };
    const history = [{ x: userCoord.x, y: userCoord.y }];

    let reached = false;
    do {
      const [newUserCoord, goDown] = getNextCoord(
        userCoord.x,
        userCoord.y,
        map
      );

      if (newUserCoord.x === userCoord.x && newUserCoord.y === userCoord.y) {
        reached = true;
      } else {
        userCoord.x = newUserCoord.x;
        userCoord.y = newUserCoord.y;
        history.push({ x: userCoord.x, y: userCoord.y });

        if (goDown) {
          userCoord.x += 1;
          history.push({ x: userCoord.x, y: userCoord.y });
        }
      }
    } while (!reached);

    // displayHistory(history);
    const reward = rewards[userCoord.y / 2];
    result.push({
      player: players[i],
      playerIndex: i,
      reward: reward,
      rewardIndex: userCoord.y / 2,
      history: history,
    });
    // console.log('Reward:', reward);
  }
  return result;
};

// for (let i = 0; i < ladderMap.length; i++) {
//   for (let j = 0; j < ladderMap.length; j++) {
//     console.log(`[${i}][${j}]: ${ladderMap[i][j]}`);
//   }
//   console.log();
// }

// const players = ['Sungmin Hong', 'Hannah Choi', 'Hoo-chu', 'Pickle'];
// const rewards = [
//   'iPhone 13',
//   'Apple Watch',
//   'Macbook Pro 16inch',
//   'Full-time job',
// ];

// const map = generateLadder(players.length);
// const results = run(players, rewards, map);
// results.forEach((item) => {
//   console.log(`player: ${item.player}, reward: ${item.reward}`);
//   displayHistory(item.history);
// });
