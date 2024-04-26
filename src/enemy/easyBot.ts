import { Turn } from "@types"
import { GameClass, Owner, Player } from "@shared"

export const easyBot = (game: GameClass, player: Player): Turn => {
  // TODO move this calculation into class.
  const enemy = player === Owner.playerOne ? Owner.playerTwo : Owner.playerOne
  const allEnemyNeighbors = game.findAllEnemyNeighbors(enemy)
  const allFreeNeighbors = game.findAllFreeNeighbors(player)

  const allEnemyNeighborsColors = game.selectColorsFromArray(allEnemyNeighbors)
  const allFreeNeighborsColors = game.selectColorsFromArray(allFreeNeighbors)

  const allAvailableColors = allFreeNeighborsColors.filter(
    (color) => !allEnemyNeighborsColors.includes(color)
  )

  if (allAvailableColors.length === 0) {
    // Impossible to turn
    return null
  }

  const allAvailableNeighbors = allFreeNeighbors.filter((neighbor) =>
    allAvailableColors.includes(game.matrix[neighbor.y][neighbor.x].color)
  )

  const index = GameClass.randomInt(0, allAvailableNeighbors.length - 1)
  return allAvailableNeighbors[index]
}
