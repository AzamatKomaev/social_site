from django.shortcuts import render, redirect

from chat.models import Chat, Message
from chat.services import can_user_to_join_in_group


def index(request) -> render:
    template_name = "chat/index.html"
    return render(request, template_name)


def room(request, chat_name: str) -> render:
    template_name = "chat/room.html"
    if not can_user_to_join_in_group(room_name=chat_name, user=request.user):
        return redirect('error404')

    messages = Message.objects.filter(chat_id=Chat.objects.get(name=chat_name).id).order_by('id')

    return render(request, template_name, {
        'room_name': chat_name,
        'messages': messages
    })
