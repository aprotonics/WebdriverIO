# WebdriverIO

### Инструкции для запуска тестов
```
В терминале перейти в директорию, содержащую файл теста
```

```
Ввести следующие команды:
```

```
npm init wdio .
```

```
Запустится WDIO CLI Wizard. Выбираем:
```

```
On my local machine
mocha
Not to use a compiler
Default
Not to autogenerate test files
Not to use page objects
spec
wait-for
chromedriver
Default
To run 'nmp install'
```

```
В файле wdio.conf.js добавляем строки:
```

```
capabilities: [{

        maxInstances: 1,
        //
        browserName: 'chrome',
        
        'goog:chromeOptions': {
            args: ['start-maximized',
            'start-in-incognito',
            'remote-debugging-port=9222'],
        },
```

```
Запускаем тесты
```

```
npm run wdio
```
