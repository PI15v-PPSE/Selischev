function SeaBattle(targetContainer, edge) {
    //Список css-классов
    var cssClasses = {
        container: 'container',
        block: 'block',
        area: 'area',
        seaContainer: 'seaContainer',
        sea: 'sea',
        messagesLog: 'messages',
        message: 'message',
        cell: 'cell',
        cellDead: 'dead',
        cellBoat: 'boat',
        cellWater: 'water',
        cellMiss: 'miss'
    };
	
    //Список идентификаторов
    var elementsIds = {
        gameContainer: 'game_container',
        playerName: 'player_name',
        computerName: 'computer_name',
        playerSeaContainer: 'player_field',
        playerSea: 'player_sea',
        computerSeaContainer: 'computer_field',
        computerSea: 'computer_sea',
        messagesLog: 'messages',
        cellIdPrefix: 'cell_',
        rowIdPrefix: 'row_'
    };
	//Список игроков
    var players = {
        Player: 'player',
        Computer: 'computer'
    };

    //Статусы ячеек на карте
    var cellType = {
        dead: 1,
        ship: 0,
        water: -1,
        miss: 2
    };

}