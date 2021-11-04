from django.shortcuts import render, redirect
from django.core.exceptions import ObjectDoesNotExist

from chat.models import Chat, Message
from chat.services import (
    can_user_to_join_in_group,
    get_data_about_room,
    get_data_about_user_chats,
    PersonalChatService
)


def show_all_chats(request) -> render:
    if not request.user.is_authenticated:
        return redirect('error404')

    chat_data = get_data_about_user_chats(user=request.user)
    return render(request, "chat/show_all_chats.html", {
        'chat_data': chat_data
    })


def room(request, chat_name: str) -> render:
    template_name = "chat/room.html"
    if not can_user_to_join_in_group(room_name=chat_name, user=request.user):
        return redirect('error404')

    json_data_chat = get_data_about_room(chat_name=chat_name)

    return render(request, template_name, {
        'messages': json_data_chat['messages'],
        'chat': json_data_chat['chat']
    })


def create_chat(request) -> render:
    template_name = "chat/create_chat.html"
    return render(request, template_name, {})


def personal_chat(request, username: str) -> render:
    template_name = "chat/personal_chat.html"
    try:
        chat_service = PersonalChatService(from_username=request.user.username, to_username=username)
        if not chat_service.is_chat_exists():
            chat_service.create()
    except ObjectDoesNotExist:
        return redirect('error404')

    return render(request, template_name, {})
