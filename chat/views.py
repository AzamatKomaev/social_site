from django.shortcuts import render, redirect

from chat.models import Chat, Message


def index(request) -> render:
    template_name = "chat/index.html"
    return render(request, template_name)


def room(request, chat_name: str) -> render:
    template_name = "chat/room.html"
    if not Chat.objects.filter(name=chat_name).exists():
        return redirect('error404')

    messages = Message.objects.filter(chat_id=Chat.objects.get(name=chat_name).id).order_by('-id')

    return render(request, template_name, {
        'room_name': chat_name,
        'messages': messages
    })
