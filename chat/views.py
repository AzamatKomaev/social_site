from django.shortcuts import render


def index(request) -> render:
    template_name = "chat/index.html"
    return render(request, template_name)


def room(request, room_name: str) -> render:
    template_name = "chat/room.html"
    return render(request, template_name, {
        'room_name': room_name
    })
