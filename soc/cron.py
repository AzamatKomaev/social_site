import sqlite3


"""Удостовертесь, что у ваш запущена cron задача, которая должна обновляться каждый час-три часа"""
conn = sqlite3.connect("../db.sqlite3")
cur = conn.cursor()


def delete_non_active_users():
    """Функция для удаления пользователей с меткой is_active == False"""
    cur.execute("SELECT username FROM auth_user WHERE date_joined < datetime('now', 'localtime', '-1 day') AND is_active = 0;")
    conn.commit()
    conn.close()


if __name__ == "__main__":
    delete_non_active_users()
