from django.shortcuts import render, redirect

from chat.models import Chat, Message
from chat.services import can_user_to_join_in_group, get_data_about_room


def index(request) -> render:
    template_name = "chat/index.html"
    return render(request, template_name)


def room(request, chat_name: str) -> render:
    template_name = "chat/room.html"
    if not can_user_to_join_in_group(room_name=chat_name, user=request.user):
        return redirect('error404')

    json_data_chat = get_data_about_room(chat_name=chat_name)

    return render(request, template_name, {
        'messages': json_data_chat['messages'],
        'chat': json_data_chat['chat']
    })
