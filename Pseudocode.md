BOARD
Array(10) of Array(10) of field objects with properties empty(boolean) hit(boolean) fleetArrayIndex(number)

attack(field)                           if hit = true return false, set hit to true, log 'Miss' when empty = true, call fleet.hit(fleetArrayIndex) when empty = false
putShip(array of fields, shipIndex)     checks if fields are all empty and valid, if not return false, for fields in array set empty to false and create field 
                                        fleetArrayIndex
getField([x, y])                        returns the field object at x, y


FLEET
array of ship objects with properties name(string) length(number) hits(number) shipSunk(boolean)

hit(fleetArrayIndex)        hit++, change shipSunk if hits = length, call fleetStatus and log a message
fleetStatus()               calls game.end() if all ships have been sunk
placeFleet()                for each ship call putShip with a array of consecutive fields in a random direction and the index of the fleet array of the ship and
                            keep calling putShip until true is returned                   
                

PLAYER
New Board                   
New Fleet

GAME
                    
computerTurn()              Call attack on random field of human, repeat if return is false
humanTurn()                 Called after click on computer field. Calls attack. Excecutes computerTurn when return is true;
end(player)                 Call the winner and stop turns

INDEX
Initialize 2 new Players call placeFleet call game.loop

UI
Container div for the entire game
  Title div
  Human board
  Computer board
    A grid of 10 x 10 divs in arrays humanFields or humanBoard
    With classes human/computer, not-hit, ship/empty, and xy00 with 00 the X and Y coordinates
    With event listener that calls a playerTurn  

setHit(name, [x, y])     Changes the class from not-hit to hit for the field [x, y] in board of name

 