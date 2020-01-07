import $ from 'jquery'
import './Cell.css'

class UnavailableCell {
  constructor (GRID_SIZE, game) {
    this.game = game
    this.GRID_SIZE = GRID_SIZE
  }

  static getRandomInt (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  isAvailableCell (row, col) {
    return !this.game.unavailableCells.includes(`${row},${col}`)
  }

  placeItem (row, col, itemClassName) {
    const cell = $(`[data-pos='(${row}, ${col})']`)
    cell.addClass('unavailable')
    cell.attr('data-type', 'unavailable')
    // Make that cell unavailable for later use
    this.game.unavailableCells.push(`${row},${col}`)
  }

  dimCell () {
    let randCellRow = UnavailableCell.getRandomInt(0, this.GRID_SIZE - 1)
    let randCellCol = UnavailableCell.getRandomInt(0, this.GRID_SIZE - 1)

    // We've found an available cell
    if (this.isAvailableCell(randCellRow, randCellCol)) {
      const cell = this.isAvailableCell(randCellRow, randCellCol)
      this.placeItem(randCellRow, randCellCol, 'unavailable')
    } else {
      // Try again!
      return this.dimCell()
    }
  }
}

export default UnavailableCell
