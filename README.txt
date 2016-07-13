[1] cGame.init
Инициализация переменных, указывающих на блоки верстки. Вызывает [2]

[2] cGame.bindEvents
Навешивает event listeners:
	2.1 Клик по кнопке readyButton
	2.2 Нажатие клавиши в блоке ввода текста inputTextBlock
	2.3 Блокирование события ctrl+v на inputTextBlock
	
[3] cGame.renderSampleText
Парсит <textarea> с кодом.
Генерирует массив строк текста sampleLines.
Заполняет блок эталонного текста sampleTextBlock.
Преобразует пробелы в &nbsp; для эталонного текста.

[4] cGame.showGame
Скрывает кнопку readyButton.
Начинает обратный отсчет, по окончании которого делает inputTextBlock enabled.

[5] codeOnKeyDown
Срабатывает при нажатии клавиши внутри inputTextBlock.
Перечитывает текст из inputTextBlock, заменяет неразрывные пробелы на обычные.
Сравнивает посимвольно введенный текст с эталонным, инкрементируя переменную equalContentLength.
Вызывает [6], передавая ей equalContentLength.

[6] highlightSample (equalContentLength)
Подкрашивает зеленым цветом построчно символы на позиции от 0 до equalContentLength.

[7] gameFinished
Вызывается при совпадении equalContentLength c длиной эталонного текста.
Посылает сигнал на сервер и выводит сообщение об окончании набора с информацией о времени и количестве опечаток.