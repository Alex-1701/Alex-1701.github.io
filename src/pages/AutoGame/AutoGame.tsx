import React, { useEffect, useMemo, useState } from "react"
import { GameTable, Layout } from "@components"
import { useAppDispatch, useAppSelector } from "@hooks"
import { GameClass, Owner, Player } from "@shared"
import { easyBot } from "@enemy"
import { ICoordinates, IGameDataNumeric } from "@types"
import { requestGameData, updateState } from "@store"

export function AutoGame() {
  const [gameInstance, setGameInstance] = useState<GameClass | null>(null)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchGameData = async () => dispatch(requestGameData()).unwrap()

    fetchGameData().then((data: IGameDataNumeric) => {
      let localState = new GameClass(data)
      setGameInstance(localState)
      let interval: NodeJS.Timer

      const handleTurn = (turn: ICoordinates | null, player: Player) => {
        console.log(localState.gameWinner)
        const clone = localState.clone()
        const isTurnSuccessful = clone.registerTurn(turn, player)
        console.log(isTurnSuccessful)
        if (!isTurnSuccessful) {
          clearInterval(interval)
          return
        }
        setGameInstance(clone)
        localState = clone
        const gameData = clone.returnMainData()
        if (gameData && isTurnSuccessful) {
          dispatch(updateState(gameData))
        }
      }

      interval = setInterval(() => {
        if (localState.playerTurn === Owner.playerOne) {
          console.log("P1")
          const turn = easyBot(localState, Owner.playerOne)
          handleTurn(turn, Owner.playerOne)
        } else {
          console.log("P2")
          const turn = easyBot(localState, Owner.playerTwo)
          handleTurn(turn, Owner.playerTwo)
        }
      }, 50)
    })
  }, [])

  return (
    <Layout>
      {gameInstance && <GameTable gameField={gameInstance.matrix} />}
    </Layout>
  )
}
