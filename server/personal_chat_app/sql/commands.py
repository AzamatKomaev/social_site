get_ordered_personal_chats = """
SELECT
       c.id as id, c.id as chat_id, max(m.created_at) as message_created_at
FROM personal_chat_app_personalchat c
INNER JOIN personal_chat_app_personalchat_users u ON (c.id = u.personalchat_id)
LEFT OUTER JOIN personal_chat_app_personalmessage m ON (c.id = m.chat_id)
WHERE u.user_id = %s AND u.personalchat_id=m.chat_id GROUP BY c.id ORDER BY max(m.created_at) DESC;
"""