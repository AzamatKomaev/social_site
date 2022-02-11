get_ordered_group_chats = """
SELECT
       c.id as id, c.id as chat_id, max(m.created_at) as message_created_at
FROM group_chat_app_groupchat c
INNER JOIN group_chat_app_groupchat_users u ON (c.id = u.groupchat_id)
LEFT OUTER JOIN group_chat_app_groupmessage m ON (c.id = m.chat_id)
WHERE u.user_id = %s AND u.groupchat_id=m.chat_id GROUP BY c.id ORDER BY max(m.created_at) DESC;
"""
