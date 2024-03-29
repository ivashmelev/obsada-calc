## Форма расчета обсады

### Старт

Установка зависимостей:

```sh
$ npm install
```

Сборка production-версии:

```sh
$ gulp webpack:prod
```

Сборка dev-версии. Включен watch-mode:

```sh
$ gulp
```
или
```sh
$ gulp webpack:dev
```
По итогу в папке build скомпилируется файл calc.js который требуется подключать на страницу.

### Инициализация
Базовый вариант
```html
<div id="calculator"></div>
<script src="build/calc.js"></script>
```
Калькулятор может принимать параметры путем передачи элементу JSON строки через аттрибут data-options
```html
<div data-options="{}" id="calculator"></div>
```

### Параметры
Все callback-функции должны быть в области видимости _window_. В качестве аргумента в функции передается корневой DOM-элемент калькулятора. Тип значения параметра должен быть _String_.

| Наименование  | Описание |
| ------------- | ------------- |
| onInit  | callback-функция, которая вызывается после инициализации калькулятора.   |
| onOrder  | callback-функция, которая вызывается при удачном выполнении запроса на расчет стоимости. |

#### Вызов callback-функций

Пример вызова функции `onCalcInit` после окончания загрузки калькулятора:

```html
<div data-options='{ "onInit": "onCalcInit" }' id="calculator"></div>
```
