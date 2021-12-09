from django.shortcuts import render


def index(
    request,
    category_id=None,
    post_id=None,
    token=None,
    username=None,
    chat_id=None
):
    return render(request, "index.html", {})
