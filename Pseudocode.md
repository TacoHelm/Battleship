BOARD
Array(10) of Array(10) of field objects with properties empty(boolean) hit(boolean) fleetArrayIndex(number)

attack(field)                           if hit = true return false, set hit to true, log 'Miss' when empty = true, call fleet.hit(fleetArrayIndex) when empty = false
putShip(array of fields, shipIndex)     checks if fields are all empty and valid, if not return false, for fields in array set empty to false, create field 
                                        fleetArrayIndex and return true
getField([x, y])                        returns the field object at x, y


FLEET
array with ship type objects: name number, length and numberSunk
array of ship objects: name(string) length(number) hits(number) shipSunk(boolean) fields(array)

hit(fleetArrayIndex)        hit++, if hits = length: change shipSunk, change numberSunk, display message, call UI.displaySunk, call checkGameEnd
checkGameEnd()              calls game.end() if all ships have been sunk
placeFleet()                for each ship call putShip with a array of consecutive fields in a random direction and the index of the fleet array of the ship and
                            keep calling putShip until return is true. Add that array to fields array of ship object 
getFleet()                  return array ship types
getShips()                  return array all ships             

PLAYER
New Board                   
New Fleet

GAME
                    
computerTurn()              Call attack on random field of human, repeat if return is false
humanTurn()                 Called after click on computer field. Calls attack. Excecutes computerTurn when return is true;
end(player)                 Call the winner and remove event listeners

INDEX
Initialize 2 new Players call placeFleet for computer call createUI, call placeShips for Human

UI
Divs:
Container
  Title 
  Message 
  Player 
    Name
    Fleet
      Divs for all ship types
        Name of ship
        Progress bars in arrays human/computerBars 
    Board
      A grid of 10 x 10 divs in arrays humanFields or humanBoard
      With classes human/computer, not-hit, ship/empty, and xy00 with 00 the X and Y coordinates
      With event listener that calls a playerTurn  

setHit(name, [x, y])          Changes the class from not-hit to hit for the field [x, y] in board of name
setMessage(string)            Adds the message to a message queue to be displayed in messageBox div at least 2.5s and highlighted with class new for 2.5s.  
displaySunk(fields, name)     Removes class hit and sets it to sunk for ship with given fleetArrayIndex, calls getFleet, updates width of all progress bars
shipString(length)            Returns a symbol string representing the given ships length
newDiv(parent, classes)       Returns a div appended to parent with classes in classlist
newDivBoth(divName, parent, classes)  Adds a new div to both the player and AI DOM Objects
startGame()                   Place event listeners computer board
endGame()                     Remove event listeners computer oard


PLACESHIPS
Display message to explain procedure
For all human ships:
  onhover       changes color to black for fields in ships length
  onleftclick   call putShip for fields in ships length, loops to next ship when return === true
  onrightclick  changes direction x -> y
call UI.startGame()
  