BOARD
Array(10) of Array(10) of field objects with properties empty(boolean) hit(boolean) fleetArrayIndex(number)

attack(field)                           if hit = true return false, set hit to true, log 'Miss' when empty = true, calls fleet.hit(shipsIndex) when empty = false
putShip(array of fields, shipIndex)     checks if fields are all empty and valid, if not return false, for fields in array set empty to false and create field 
                                        shipIndex


FLEET
array of ship objects with properties name(string) length(number) hits(number) shipSunk(boolean)

hit(shipsIndex)             hit++, change shipSunk if hits = length, call fleetStatus and log a message
fleetStatus()               calls game.end if all ships have been sunk
placeFleet()                for each ship call putShip with a array of consecutive fields in a random direction and the index of the fleet array of the ship and
                            keep calling putShip until true is returned                   
                

PLAYER
New Board                   Initialize board before fleet!!
New Fleet


GAME
loop()                      Alternate between calling computerTurn and playerTurn()                      
computerTurn()              Call attack on random field of player, repeat if return is false
humanTurn()                 Prompt for field. Call attack(field) on computer.board, repeat if return is false
end(player)                 Call the winner and stop turns

INDEX
Initialize 2 new Players call placeFleet call game.loop

 