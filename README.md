<h1>InTheGame</h1>
  Всем привет. Это мой первый проект на django rest framework + react (typescript).
<br>
<h2>Что из себя представляет сайт?</h2>
<p>
  1. Данный сайт является соц.сетью уже с готовой системой входа и регистраций, создания постов и комментариев, групповые и приватные чаты, система добавления друзей. Любые замечания по проекту буду только рад услышать.<br><br>
  2. Сайт имеет логику удаления непотвержденных пользователей, которые не подтвердили свой аккаунт по почте при помощи crontab'a. Не забудьте добавить задачу для файла 'soc/cron.py', при этом желательно указать время исполнения файла каждые 1-3 часа.<br><br>
  3. Сайт использует базу данных postgresql. <br><br>
  4. Фронт написан при использований react. Также можно найти typescript файлы (добавил только недавно).<br><br>
  5. Бекенд написан полностью на rest framework без использования 'чистой' Django.<br><br>
  6. Авторизация пользователей происходит по jwt токену.
</p>
<h2>Stack</h2>
<p>
    1. Django, django rest framework. <br>
    Основные библиотеки: django channels, simplejwt, django-polymorphic.<br><br>
    2. React (typescript). <br>
    Основные библиотеки: bootstrap, react-router-dom, axios.
</p>

<h2>Как запустить проект?</h2>
1. Склонируйте проект к себе на устройство. <br><br>
 
```bash
git clone https://github.com/AzamatKomaev/social_site.git
```
2. Создайте виртуальное окружение: <br>

```bash
python -m venv env 
```
и активируйте: <br>

```bash
. ./env/bin/activate
```

3. Установите python зависимости. Перейдите в папку server и введите следующую команду: <br>

```bash
pip install -r requirements.txt
```

4. Установите npm зависимости по содержимому <b>client/package.json</b> файла. <br><br>
5. Перейдите в корневую директорию. Создайте файл <b>setenv.sh</b>.Внутрь поместите содержимое: 

```bash 
    export KEY="ваш SECRET_KEY из settings.py"
    export EMAIL="ваша почта для отправок сообщений"
    export PASSWORD_FROM_EMAIL="ваш пароль к этой почте"
    export NAME_DATABASE_POSTGRESQL="название базы данных pgsql"
    export PASSWORD_FROM_POSTGRESQL="пароль от этой базы данных."
    export USER_POSTGRESQL="имя пользователя базы данных"
    export HOST_POSTGRESQL="хост базы данных"
    export NODE_OPTIONS=--openssl-legacy-provider
```

6. Активируйте ранее созданый файл: <br>
 
```bash
. ./setenv.sh
```

7. Перейдите в папку <b>client</b>. 'Сбилдите' проект: <br>

```bash
npm run build
```
8. Перейдите в корневую папку, а затем в <b>server</b>. Соберите всю статику при помощи команды: <br>

```bash
python3 manage.py collectstatic
```
Подтвердите ваше действие `yes`<br><br>
9. Создайте миграций и внедрите их в проект: <br>

```bash
python3 manage.py makemigrations
python3 manage.py migrate
```
10. Создайте супер пользователя: <br>
  
```bash
python3 manage.py createsuperuser
```
Выберите юзернейм, пароль и почту. (почта важна)<br><br>
11. Запустите проект: <br>

```bash 
python3 manage.py runserver
```
Поздравляю! Теперь вы можете использовать эту соц сеть.
