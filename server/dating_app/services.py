from rest_framework.exceptions import ValidationError


def is_serializer_valid(serializer_data: dict[str, str]):
    if serializer_data['type'] == 'Telegram' and serializer_data['telegram_id'] is None:
        raise ValidationError({'error': 'You have to authorize from telegram or site.'})

    if serializer_data['type'] == 'Site' and serializer_data['user'] is None:
        raise ValidationError({'error': 'You have to authorize from telegram or site.'})

