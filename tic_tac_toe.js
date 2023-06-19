{\rtf1\ansi\ansicpg1252\cocoartf2636
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const player1 = 'X';\
const player2 = 'O';\
let currentPlayer = player1;\
let gameActive = true;\
let gameState = ['', '', '', '', '', '', '', '', ''];\
\
const winCombinations = [\
  [0, 1, 2], [3, 4, 5], [6, 7, 8], \
  [0, 3, 6], [1, 4, 7], [2, 5, 8], \
  [0, 4, 8], [2, 4, 6]\
];\
\
function makeMove(cellIndex) \{\
  if (gameState[cellIndex] === '' && gameActive) \{\
    gameState[cellIndex] = currentPlayer;\
    const cell = document.getElementsByClassName('cell')[cellIndex];\
    cell.innerText = currentPlayer;\
    if (checkWin()) \{\
      announceResult(currentPlayer + ' wins!');\
      gameActive = false;\
    \} else if (checkDraw()) \{\
      announceResult("It's a draw!");\
      gameActive = false;\
    \} else \{\
      currentPlayer = currentPlayer === player1 ? player2 : player1;\
      if (currentPlayer === player2) \{\
        makeAIMove();\
      \}\
      updateTurnMessage();\
    \}\
  \}\
\}\
\
function checkWin() \{\
  for (let combination of winCombinations) \{\
    const [a, b, c] = combination;\
    if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) \{\
      return true;\
    \}\
  \}\
  return false;\
\}\
\
function checkDraw() \{\
  return gameState.indexOf('') === -1;\
\}\
\
function announceResult(message) \{\
  document.getElementById('result').innerText = message;\
\}\
\
function updateTurnMessage() \{\
  document.getElementById('turn').innerText = `Current Turn: Player $\{currentPlayer\}`;\
\}\
\
function resetGame() \{\
  currentPlayer = player1;\
  gameActive = true;\
  gameState = ['', '', '', '', '', '', '', '', ''];\
  const cells = document.getElementsByClassName('cell');\
  for (let cell of cells) \{\
    cell.innerText = '';\
  \}\
  document.getElementById('result').innerText = '';\
  updateTurnMessage();\
\}\
\
function makeAIMove() \{\
  const bestMove = getBestMove();\
  if (bestMove !== null) \{\
    makeMove(bestMove);\
  \}\
\}\
\
function getBestMove() \{\
  let bestScore = -Infinity;\
  let bestMove = null;\
\
  for (let i = 0; i < gameState.length; i++) \{\
    if (gameState[i] === '') \{\
      gameState[i] = player2;\
      const score = minimax(gameState, 0, false);\
      gameState[i] = '';\
      if (score > bestScore) \{\
        bestScore = score;\
        bestMove = i;\
      \}\
    \}\
  \}\
\
  return bestMove;\
\}\
\
const scores = \{\
  X: -1,\
  O: 1,\
  tie: 0\
\};\
\
function minimax(state, depth, maximizingPlayer) \{\
  if (checkWin()) \{\
    const winner = currentPlayer === player1 ? player2 : player1;\
    return scores[winner];\
  \} else if (checkDraw()) \{\
    return scores.tie;\
  \}\
\
  if (maximizingPlayer) \{\
    let maxScore = -Infinity;\
    for (let i = 0; i < state.length; i++) \{\
      if (state[i] === '') \{\
        state[i] = player2;\
        const score = minimax(state, depth + 1, false);\
        state[i] = '';\
        maxScore = Math.max(score, maxScore);\
      \}\
    \}\
    return maxScore;\
  \} else \{\
    let minScore = Infinity;\
    for (let i = 0; i < state.length; i++) \{\
      if (state[i] === '') \{\
        state[i] = player1;\
        const score = minimax(state, depth + 1, true);\
        state[i] = '';\
        minScore = Math.min(score, minScore);\
      \}\
    \}\
    return minScore;\
  \}\
\}\
}