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
	    //Сложение строк через разделитель
    var concat = function (firstString, secondString, delimeter) {
        return firstString.concat((delimeter || ' ') + secondString);
    };
    //Получаем игровое поле для указанного игрока
    var getSeaArea = function (id, labelValue, inputId, inputDefaultValue, inputTitle, inputPlaceholder, inputAutoFocus) {
        return $('<div>')
            .attr('class', cssClasses.block)
            .append(
                $('<label>')
                    .attr('for', id)
                    .html(
                        concat(
                            labelValue,
                            getPlayerNameInputHtml(
                                inputId,
                                inputDefaultValue,
                                inputTitle,
                                inputPlaceholder,
                                inputAutoFocus)
                        )
                    )
            )
            .append(
                $('<div>')
                    .attr('id', id)
                    .attr('class', concat(cssClasses.area, cssClasses.seaContainer))
            );
    };
	
    //Получаем поле с сообщениями
    var getMessagesArea = function () {
        return $('<div>')
            .attr('class', cssClasses.block)
            .append(
                $('<label>')
                    .attr('for', elementsIds.messagesLog)
                    .html('Сообщения:')
            )
            .append(
                $('<div>')
                    .attr('id', elementsIds.messagesLog)
                    .attr('class', concat(cssClasses.area, cssClasses.messagesLog))
            );
    };
	
    //Получить поле, содежащее игру
    var getGameContainer = function () {
        var gameContainer = $('<div>')
            .attr('id', elementsIds.gameContainer)
            .attr('class', cssClasses.container)
            .append($('<h1>').html('Морской бой'));

        gameContainer
            .append(
                getSeaArea(
                    elementsIds.playerSeaContainer,
                    'Ваше поле,',
                    elementsIds.playerName,
                    'Игрок',
                    'Имя игрока',
                    'Введите ваше имя',
                    true
                )
            ).append(
            getSeaArea(
                elementsIds.computerSeaContainer,
                'Противник',
                elementsIds.computerName,
                'Компьютер',
                'Имя компьютера',
                'Введите имя компьютера',
                false
            )
        ).append(
            getMessagesArea()
        );

        return gameContainer;
    };
    //Получить текущие дату и время в читаемой строке
    var getCurrentDateTimeString = function () {
        var delimiter = '.';
        var currentDateTime = new Date();
        return currentDateTime.getDate() + delimiter
            + (currentDateTime.getMonth() + 1) + delimiter
            + currentDateTime.getFullYear() + ' '
            + currentDateTime.getHours() + delimiter
            + currentDateTime.getMinutes();
    };


}