from datetime import datetime
import sqlite3


"""
    Данная cron-задача служит для сброса лимита api токена.
    Советую обновлять его каждые 12-24 часа.
"""

try:
    conn = sqlite3.connect("/home/azamat/Рабочий стол/Django/social/db.sqlite3")
    cur = conn.cursor()

    """Обновляем счетчик использования токена."""
    cur.execute("UPDATE soc_api_tokenwasused SET was_used = 0;")
    conn.commit()
    print(f"Tokens were successfully updated at {datetime.now()}")

    conn.close()
except:
    print("error!!!!!")

