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
	
<<<<<<< HEAD
	//Получить текущие дату и время в читаемой строке
=======
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

    //Добавить новое сообщение
    var createMessage = function (text, colorClass) {
        $('#' + elementsIds.messagesLog).prepend(
            $('<p>')
                .attr('class', concat(cssClasses.message, colorClass))
                .html(concat(getCurrentDateTimeString(), text, ' : '))
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

<<<<<<< HEAD
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

=======
	
    //Отрисовать контейнер игры внутри указанного элемента
    var drawGameContainer = function (target) {
        target.empty();
        target.append(getGameContainer());
    };

    //Получить имя игрока
    var getPlayerName = function () {
        return $('#' + elementsIds.playerName).val();
    };

    //Получить имя компьтера
    var getComputerName = function () {
        return $('#' + elementsIds.computerName).val();
    };

    //Получить случайно целое число  в интервале
    var getRandomIntBetween = function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    //Построить пустую карту с указанной шириной грани
    var createEmptyShipsMap = function () {
        var emptyMap = [];
        for (var x = 1; x <= edge; x++) {
            emptyMap[x] = [];
            for (var y = 1; y <= edge; y++) {
                emptyMap[x][y] = cellType.water;
            }
        }
        return emptyMap;
    };

    //Проверить, свободны ли ячейка и её окрестности от кораблей
    var cellRangeIsFree = function (map, cell_x, cell_y) {
        if (map[cell_x] && map[cell_x][cell_y]) {
            var coordinate_x, coordinate_y;
            for (var x = -1; x <= 1; x++) {
                for (var y = -1; y <= 1; y++) {
                    coordinate_x = cell_x + x;
                    coordinate_y = cell_y + y;
                    if (map[coordinate_x]
                        && map[coordinate_x][coordinate_y] == cellType.ship) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    };

    //Проверить возможность размещения судна в определенном направлении
    var checkDirection = function (map, direction, x, y, shipLength) {
        var lastCoordinate;
        switch (direction) {
            //1 буква переменной => 1 буква направления
            case 'top':
                lastCoordinate = x + shipLength;
                if (lastCoordinate <= edge) {
                    for (var tx = x; tx < lastCoordinate; tx++) {
                        if (!cellRangeIsFree(map, tx, y)) {
                            return false;
                        }
                    }
                }
                else {
                    return false;
                }
                break;
            case 'bottom':
                lastCoordinate = x - shipLength;
                if (lastCoordinate < 0) {
                    for (var bx = x; bx > lastCoordinate; bx--) {
                        if (!cellRangeIsFree(map, bx, y)) {
                            return false;
                        }
                    }
                }
                else {
                    return false;
                }
                break;
            case 'left':
                lastCoordinate = y - shipLength;
                if (lastCoordinate < 0) {
                    for (var ly = y; ly > lastCoordinate; ly--) {
                        if (!cellRangeIsFree(map, x, ly)) {
                            return false;
                        }
                    }
                }
                else {
                    return false;

                }
                break;
            case 'right':
                lastCoordinate = y + shipLength;
                if (lastCoordinate < edge) {
                    for (var ry = y; ry < lastCoordinate; ry++) {
                        if (!cellRangeIsFree(map, x, ry)) {
                            return false;
                        }
                    }
                }
                else {
                    return false;
                }
                break;
        }
        return true;
    };
<<<<<<< HEAD
    return {
=======
	
	    return {
>>>>>>> lab4

        //Инициализация игры
        init: function () {
            drawGameContainer(targetContainer);
            createMessage('Добро пожаловать в морской бой!');
        }

<<<<<<< HEAD

    }
=======
>>>>>>> lab4

    }
}