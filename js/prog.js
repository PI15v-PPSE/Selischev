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
	
    //Завершена ли игра
    var gameEnded = false;

    //Поле с сообщениями
    var messagesArea;

    //Карты полей боя игроков
    var computerMap, playerMap;

    //Лог выстрелов компьютера
    var computerShots;

    //Имена игроков
    var playerName, computerName;

    //Список кораблей и их координат у игроков
    var playerShips, computerShips;

    //Список сторон, на которых можно расположить корабль
    var possibleDirections = ['top', 'bottom', 'right', 'left'];

    //Получаем html-текст поля ввода с именем игрока
    var getPlayerNameInputHtml = function (id, defaultName, title, placeholder, autofocus) {
        return $('<input>')
            .attr('id', id)
            .attr('type', 'text')
            .attr('placeholder', placeholder)
            .attr('title', title)
            .attr('autofocus', autofocus ? 'true' : 'false')
            .attr('value', defaultName)
            .prop('outerHTML');
    };

}