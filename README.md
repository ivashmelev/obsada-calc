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
```html
<script src="dist/calc.js"></script>
<div id="calculator"></div>
```