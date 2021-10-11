<h1>InTheGame</h1>
<hr>
<p>
  Всем привет. Это мой первый проект на Django. Тут я использую также bootstrap4. Пишу сайт около 2-3 месяцев.
</p>
<br>
<h2>Что из себя представляет сайт?</h2>
<p>
  1. Данный сайт является мини соц.сетью уже с готовой системой входа и регистраций, создания постов и комментариев, обработка ошибок итд. Любые замечания по проекту буду только рад услышать.<br><br>
  2. Сайт имеет логику удаления непотвержденных пользователей, которые не подтвердили свой аккаунт по почте при помощи crontab'a. Не забудьте добавить задачу для файла 'soc/cron.py', при этом желательно указать время исполнения файла каждые 1-3 часа.<br><br>
  3. Сайт использует базу данных по умолчанию: sqlite3. Я не стал заносить её в git-репзиторий, поэтому, чтобы создать базу данных, пропишите в командной строке следующее:<br><br>
  <b>python manage.py migrate</b><br><br>
  4. Также присутствуют unit тесты (пока на стадий разработки и изучения). Чтобы ими воспользоваться используйте команду<br><br>
  <img src="screens_for_gitrep/tests.jpg" alt="test"><br>
  <b>python manage.py test</b><br><br>
  5. Не забудьте добавить настройку SMPT для подтверждения аккаунтов и восстановление паролей на сайте.<br><br>
  <img src="screens_for_gitrep/mail2.jpg" alt="mail2"><br>
</p>
<h2>Внешний вид</h2>
<p>
  А вот сама вертска:<br><br>
  <img src="screens_for_gitrep/disain1.jpg" alt="disain1">
  <img src="screens_for_gitrep/disain2.jpg" alt="disain2">
  <img src="screens_for_gitrep/disain3.jpg" alt="disain3">
  <img src="screens_for_gitrep/disain4.jpg" alt="disain4">
  <img src="screens_for_gitrep/disain5.jpg" alt="disain5">
  <img src="screens_for_gitrep/disain6.jpg" alt="disain6">
  <img src="screens_for_gitrep/disain7.jpg" alt="disain7">
  <img src="screens_for_gitrep/disain8.jpg" alt="disain8">
</p>
