from typing import Optional

from django.contrib.auth.models import Group

from rest_framework.test import APITestCase

from content_app.models import Category
from user_app.models import User
from user_app.tests.services.user_services import UserAuthAPITestService
from .services.content_services import ContentAPITestService


class ContentTestCase(APITestCase):
    def get_user_jwt(self, username: str, password: str) -> Optional[str]:
        return UserAuthAPITestService.login_user(username, password).json().get('access')

    def setUp(self):
        group = Group.objects.create(name='User')
        UserAuthAPITestService.create_user({
            'username': 'User1',
            'email': 'user1@mail.ru',
            'password': 'same_password'
        })
        UserAuthAPITestService.create_user({
            'username': 'User2',
            'email': 'user2@mail.ru',
            'password': 'same_password'
        })
        UserAuthAPITestService.create_user({
            'username': 'User3',
            'email': 'user3@mail.ru',
            'password': 'same_password'
        })

        users = User.objects.all()
        UserAuthAPITestService.accept_all_users(users)

        for user in users:
            group.user_set.add(user)

        Category.objects.create(name='First Category')
        Category.objects.create(name='Second Category')

    def test_creating_posts(self):
        category_id = Category.objects.first().id
        # trying to create a post with invalid user jwt.
        created_post_response_as_non_auth = ContentAPITestService.create_post(
            user_jwt='some_string',
            detail_data={'title': 'Title1', 'text': 'Text1'},
            category_id=category_id
        )
        self.assertEqual(created_post_response_as_non_auth.status_code, 401)

        # trying to create a post with invalid title.
        created_post_response_with_invalid_title = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': '', 'text': 'Text2'},
            category_id=category_id
        )
        self.assertEqual(created_post_response_with_invalid_title.status_code, 400)
        self.assertIn('title', created_post_response_with_invalid_title.json())
        self.assertEqual(created_post_response_with_invalid_title.json()['title'], ['Это поле не может быть пустым.'])

        # trying to create a post with invalid text.
        created_post_response_with_invalid_text = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': 'Title3', 'text': ''},
            category_id=category_id
        )
        self.assertEqual(created_post_response_with_invalid_text.status_code, 400)
        self.assertIn('text', created_post_response_with_invalid_text.json())
        self.assertEqual(created_post_response_with_invalid_text.json()['text'], ['Это поле не может быть пустым.'])

        # trying to create a post with invalid title and text.
        created_post_response_with_invalid_title_and_text = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': '', 'text': ''},
            category_id=category_id
        )
        self.assertIn('title', created_post_response_with_invalid_title_and_text.json())
        self.assertIn('text', created_post_response_with_invalid_title_and_text.json())
        self.assertEqual(created_post_response_with_invalid_title_and_text.status_code, 400)

        # creating a post in the first category.
        created_post_response = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': 'Title4', 'text': 'Text4'},
            category_id=category_id
        )
        self.assertEqual(created_post_response.status_code, 201)
        self.assertEqual(created_post_response.json().get('category'), category_id)

    def test_getting_posts(self):
        # getting all categories.
        gotten_categories_response = ContentAPITestService.get_categories()
        category1_id = gotten_categories_response.json()[0].get('id')
        category2_id = gotten_categories_response.json()[1].get('id')

        self.assertEqual(gotten_categories_response.status_code, 200)
        self.assertEqual(len(gotten_categories_response.json()), 2)
        self.assertEqual(gotten_categories_response.json()[0].get('count'), 0)
        self.assertEqual(gotten_categories_response.json()[1].get('count'), 0)

        # creating a post as User1 in First Category
        created_post_response_as_user1_in_category1 = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': 'Title1', 'text': 'Text1'},
            category_id=category1_id
        )
        self.assertEqual(created_post_response_as_user1_in_category1.status_code, 201)

        # creating a post as User2 in Second Category.
        created_post_response_as_user2_in_category2 = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': 'Title2', 'text': 'Text2'},
            category_id=category2_id
        )
        self.assertEqual(created_post_response_as_user2_in_category2.status_code, 201)

        # getting detail 'First Category' category.
        gotten_category1_detail_response1 = ContentAPITestService.get_detail_category(category1_id)
        self.assertEqual(gotten_category1_detail_response1.status_code, 200)
        self.assertEqual(gotten_category1_detail_response1.json().get('count'), 1)

        # getting detail 'Second Category' category.
        gotten_category2_detail_response1 = ContentAPITestService.get_detail_category(category2_id)
        self.assertEqual(gotten_category2_detail_response1.status_code, 200)
        self.assertEqual(gotten_category2_detail_response1.json().get('count'), 1)

        # getting First Category post list.
        gotten_post_list_response_by_category1 = ContentAPITestService.get_post_list(category1_id)
        self.assertEqual(gotten_post_list_response_by_category1.status_code, 200)
        self.assertEqual(len(gotten_post_list_response_by_category1.json()), 1)
        self.assertEqual(
            gotten_post_list_response_by_category1.json()[0].get('id'),
            created_post_response_as_user1_in_category1.json().get('id')
        )

        # getting Second Category post list.
        gotten_post_list_response_by_category2 = ContentAPITestService.get_post_list(category2_id)
        self.assertEqual(gotten_post_list_response_by_category2.status_code, 200)
        self.assertEqual(len(gotten_post_list_response_by_category2.json()), 1)
        self.assertEqual(
            gotten_post_list_response_by_category2.json()[0].get('id'),
            created_post_response_as_user2_in_category2.json().get('id')
        )

        # creating a post as User1 in Second Category
        created_post_response_as_user1_in_category2 = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': 'Title3', 'text': 'Text3'},
            category_id=category2_id
        )
        self.assertEqual(created_post_response_as_user1_in_category2.status_code, 201)

        # creating a post as User2 in First Category
        created_post_response_as_user2_in_category2 = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User2', 'same_password'),
            detail_data={'title': 'Title4', 'text': 'Text4'},
            category_id=category1_id
        )
        self.assertEqual(created_post_response_as_user2_in_category2.status_code, 201)

        # getting detail 'First Category' category second time.
        gotten_category1_detail_response2 = ContentAPITestService.get_detail_category(category1_id)
        self.assertEqual(gotten_category2_detail_response1.status_code, 200)
        self.assertEqual(gotten_category2_detail_response1.json().get('count'), 1)

        # getting detail 'Second Category' category second time.
        gotten_category2_detail_response2 = ContentAPITestService.get_detail_category(category2_id)
        self.assertEqual(gotten_category2_detail_response2.status_code, 200)
        self.assertEqual(gotten_category2_detail_response2.json().get('count'), 2)

        # getting First Category post list.
        gotten_post_list_response1_by_category1 = ContentAPITestService.get_post_list(category1_id)
        self.assertEqual(gotten_post_list_response1_by_category1.status_code, 200)
        self.assertEqual(len(gotten_post_list_response1_by_category1.json()), 2)

        # getting Second Category post list.
        gotten_post_list_response2_by_category2 = ContentAPITestService.get_post_list(category2_id)
        self.assertEqual(gotten_post_list_response2_by_category2.status_code, 200)
        self.assertEqual(len(gotten_post_list_response2_by_category2.json()), 2)

        # getting a detail post in First Category created by User1.
        gotten_post_detail_response1 = ContentAPITestService.get_post_detail(
            gotten_post_list_response1_by_category1.json()[1].get('id')
        )
        self.assertEqual(gotten_post_detail_response1.status_code, 200)
        self.assertEqual(
            gotten_post_detail_response1.json().get('id'),
            gotten_post_list_response1_by_category1.json()[1].get('id')
        )

        # getting a detail post in Second Category created by User2.
        gotten_post_detail_response2 = ContentAPITestService.get_post_detail(
            gotten_post_list_response2_by_category2.json()[1].get('id')
        )
        self.assertEqual(gotten_post_detail_response2.status_code, 200)
        self.assertEqual(
            gotten_post_detail_response2.json().get('id'),
            gotten_post_list_response2_by_category2.json()[1].get('id')
        )

        # trying to get not existing chat.
        gotten_non_exists_post_detail_response = ContentAPITestService.get_post_detail(post_id=100)
        self.assertEqual(gotten_non_exists_post_detail_response.status_code, 404)

    def test_deleting_content(self):
        # creating a post in the first category.
        category_id = Category.objects.first().id

        # creating a couple of posts.
        created_post_response1 = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            detail_data={'title': 'Title1', 'text': 'Text1'},
            category_id=category_id
        )

        created_post_response2 = ContentAPITestService.create_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User2', 'same_password'),
            detail_data={'title': 'Title2', 'text': 'Text2'},
            category_id=category_id
        )

        # trying to delete the post as anonymous.
        deleted_post_response1_as_anonymous = ContentAPITestService.delete_post(
            user_jwt='',
            post_id=created_post_response1.json().get('id')
        )
        self.assertEqual(deleted_post_response1_as_anonymous.status_code, 401)

        # trying to delete the post as not creator.
        deleted_post_response1_as_not_creator = ContentAPITestService.delete_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User2', 'same_password'),
            post_id=created_post_response1.json().get('id')
        )
        self.assertEqual(deleted_post_response1_as_not_creator.status_code, 403)
        self.assertIn('detail', deleted_post_response1_as_not_creator.json())
        self.assertEqual(
            deleted_post_response1_as_not_creator.json()['detail'],
            'У вас недостаточно прав для выполнения данного действия.'
        )

        # getting detail 'First Category' category.
        gotten_category_detail_response1 = ContentAPITestService.get_detail_category(category_id)
        self.assertEqual(gotten_category_detail_response1.status_code, 200)
        self.assertEqual(gotten_category_detail_response1.json().get('count'), 2)

        # deleting a chat as creator of the chat.
        deleted_post_response1_as_creator = ContentAPITestService.delete_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            post_id=created_post_response1.json().get('id')
        )
        self.assertEqual(deleted_post_response1_as_creator.status_code, 204)

        # getting detail 'First Category' second time.
        gotten_category_detail_response2 = ContentAPITestService.get_detail_category(category_id)
        self.assertEqual(gotten_category_detail_response2.status_code, 200)
        self.assertEqual(gotten_category_detail_response2.json().get('count'), 1)

        # trying to get a chat that was deleted above.
        gotten_post_response1 = ContentAPITestService.get_post_detail(created_post_response1.json().get('id'))
        self.assertEqual(gotten_post_response1.status_code, 404)

        # getting a chat that wasn't deleted.
        gotten_post_response2 = ContentAPITestService.get_post_detail(created_post_response2.json().get('id'))
        self.assertEqual(gotten_post_response2.status_code, 200)

        # trying to delete the chat from Second Category from User2 as User1.
        deleted_post_response2_as_not_creator = ContentAPITestService.delete_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User1', 'same_password'),
            post_id=created_post_response2.json().get('id')
        )
        self.assertEqual(deleted_post_response2_as_not_creator.status_code, 403)
        self.assertIn('detail', deleted_post_response2_as_not_creator.json())
        self.assertEqual(
            deleted_post_response2_as_not_creator.json()['detail'],
            'У вас недостаточно прав для выполнения данного действия.'
        )

        # deleting the chat as creator.
        deleted_post_response2_as_creator = ContentAPITestService.delete_post(
            user_jwt=UserAuthAPITestService.get_user_jwt('User2', 'same_password'),
            post_id=created_post_response2.json().get('id')
        )
        self.assertEqual(deleted_post_response2_as_creator.status_code, 204)

        # getting detail 'First Category' third time.
        gotten_category_detail_response3 = ContentAPITestService.get_detail_category(category_id)
        self.assertEqual(gotten_category_detail_response3.status_code, 200)
        self.assertEqual(gotten_category_detail_response3.json().get('count'), 0)

        # trying to get a chat that was deleted above.
        gotten_post_response2 = ContentAPITestService.get_post_detail(created_post_response2.json().get('id'))
        self.assertEqual(gotten_post_response2.status_code, 404)

    def test_comments(self):
        gotten_categories_response = ContentAPITestService.get_categories()
        category1_id = gotten_categories_response.json()[0].get('id')
        category2_id = gotten_categories_response.json()[1].get('id')

        user1_jwt = UserAuthAPITestService.get_user_jwt('User1', 'same_password')
        user2_jwt = UserAuthAPITestService.get_user_jwt('User2', 'same_password')
        user3_jwt = UserAuthAPITestService.get_user_jwt('User3', 'same_password')

        # creating a post in Category 1 as User1.
        created_post_response1 = ContentAPITestService.create_post(
            detail_data={'title': 'Title1', 'text': 'Text1'},
            category_id=category1_id,
            user_jwt=user1_jwt
        )
        self.assertEqual(created_post_response1.status_code, 201)
        self.assertEqual(created_post_response1.json().get('comments_count'), 0)
        post1_id = created_post_response1.json().get('id')
        
        # creating a post in Category 2 as User2
        created_post_response2 = ContentAPITestService.create_post(
            detail_data={'title': 'Title2', 'text': 'Text2'},
            category_id=category2_id,
            user_jwt=user2_jwt
        )
        self.assertEqual(created_post_response2.status_code, 201)
        self.assertEqual(created_post_response2.json().get('comments_count'), 0)
        post2_id = created_post_response2.json().get('id')

        # trying to create a comment with invalid text.
        created_comment_response_with_invalid_text = ContentAPITestService.create_comment(
            user_jwt=user1_jwt,
            data={'text': '', 'post': post1_id}
        )
        self.assertEqual(created_comment_response_with_invalid_text.status_code, 400)
        self.assertIn('text', created_comment_response_with_invalid_text.json())
        self.assertEqual(
            created_comment_response_with_invalid_text.json().get('text'),
            ['Это поле не может быть пустым.']
        )

        # trying to create a comment for non exist Post.
        created_comment_response_for_non_exist_post = ContentAPITestService.create_comment(
            user_jwt=user1_jwt,
            data={'text': 'some', 'post': 1000}
        )
        self.assertEqual(created_comment_response_for_non_exist_post.status_code, 400)
        self.assertIn('post', created_comment_response_for_non_exist_post.json())
        self.assertEqual(
            created_comment_response_for_non_exist_post.json()['post'][0],
            'Недопустимый первичный ключ "1000" - объект не существует.'
        )

        # trying to create a comment as anonymous.
        created_comment_response_as_anonymous = ContentAPITestService.create_comment(
            user_jwt='_',
            data={'text': 'some', 'post': post1_id}
        )
        self.assertEqual(created_comment_response_as_anonymous.status_code, 401)

        # creating a comment as User1 for Post1.
        created_comment_response1 = ContentAPITestService.create_comment(
            user_jwt=user1_jwt,
            data={'text': 'Comment1', 'post': post1_id}
        )
        self.assertEqual(created_comment_response1.status_code, 201)

        # creating a comment as User2 for Post2.
        created_comment_response2 = ContentAPITestService.create_comment(
            user_jwt=user2_jwt,
            data={'text': 'Comment2', 'post': post2_id}
        )
        self.assertEqual(created_comment_response2.status_code, 201)

        # creating second comment as User3 for Post2.
        created_comment_response3 = ContentAPITestService.create_comment(
            user_jwt=user3_jwt,
            data={'text': 'Comment3', 'post': post2_id}
        )
        self.assertEqual(created_comment_response3.status_code, 201)

        # getting post detail created by User1.
        gotten_user1_post_detail = ContentAPITestService.get_post_detail(post1_id)
        self.assertEqual(gotten_user1_post_detail.status_code, 200)
        self.assertEqual(gotten_user1_post_detail.json().get('comments_count'), 1)

        # getting post detail created by User2.
        gotten_user2_post_detail = ContentAPITestService.get_post_detail(post2_id)
        self.assertEqual(gotten_user2_post_detail.status_code, 200)
        self.assertEqual(gotten_user2_post_detail.json().get('comments_count'), 2)

        # getting comment list for Post1.
        gotten_comment_list_for_user1_post = ContentAPITestService.get_comment_list(post1_id)
        self.assertEqual(gotten_comment_list_for_user1_post.status_code, 200)
        self.assertEqual(len(gotten_comment_list_for_user1_post.json()), 1)
        self.assertEqual(
            gotten_comment_list_for_user1_post.json()[0].get('id'),
            created_comment_response1.json().get('id')
        )

        # getting comment list for Post2.
        gotten_comment_list_for_user2_post = ContentAPITestService.get_comment_list(post2_id)
        self.assertEqual(gotten_comment_list_for_user2_post.status_code, 200)
        self.assertEqual(len(gotten_comment_list_for_user2_post.json()), 2)
        self.assertEqual(
            gotten_comment_list_for_user2_post.json()[-1].get('id'),
            created_comment_response2.json().get('id')
        )

        # trying to get non exist detail comment.
        gotten_comment_detail_non_exists = ContentAPITestService.get_comment_detail(100)
        self.assertEqual(gotten_comment_detail_non_exists.status_code, 404)

        # getting comment detail created by User1 for Post1.
        gotten_comment_detail_in_post1 = ContentAPITestService.get_comment_detail(
            created_comment_response1.json().get('id')
        )
        self.assertEqual(gotten_comment_detail_in_post1.status_code, 200)

        # getting comment_detail created by User2 for Post2.
        gotten_comment_detail_in_post2 = ContentAPITestService.get_comment_detail(
            created_comment_response2.json().get('id')
        )
        self.assertEqual(gotten_comment_detail_in_post2.status_code, 200)

        # trying to delete a comment created by User1 for Post1 as User3
        # (the user is not a creator of the post or owner of the comment).
        deleted_comment1_response_as_user3 = ContentAPITestService.delete_comment(
            user_jwt=user3_jwt,
            comment_id=gotten_comment_detail_in_post1.json().get('id')
        )
        self.assertEqual(deleted_comment1_response_as_user3.status_code, 403)

        # trying to delete a comment created by User3 for Post2 as User1
        # (the user is not a creator of the post or owner of the comment).
        deleted_comment3_response_as_user3 = ContentAPITestService.delete_comment(
            user_jwt=user1_jwt,
            comment_id=created_comment_response3.json().get('id')
        )
        self.assertEqual(deleted_comment3_response_as_user3.status_code, 403)

        # deleting a comment created by User2 for Post1 as User2
        # (the user currently is owner of the comment).
        deleted_comment2_response_as_user2 = ContentAPITestService.delete_comment(
            user_jwt=user2_jwt,
            comment_id=created_comment_response2.json().get('id')
        )
        self.assertEqual(deleted_comment2_response_as_user2.status_code, 204)

        # deleting a comment created by User3 for Post2 as User2
        # (the user currently is creator of the post).
        deleted_comment3_response_as_user2 = ContentAPITestService.delete_comment(
            user_jwt=user2_jwt,
            comment_id=created_comment_response3.json().get('id')
        )
        self.assertEqual(deleted_comment3_response_as_user2.status_code, 204)

        # getting comment list for Post1.
        gotten_comment_list_for_user1_post = ContentAPITestService.get_comment_list(post1_id)
        self.assertEqual(gotten_comment_list_for_user1_post.status_code, 200)
        self.assertEqual(len(gotten_comment_list_for_user1_post.json()), 1)

        # getting comment list for Post2.
        gotten_comment_list_for_user2_post = ContentAPITestService.get_comment_list(post2_id)
        self.assertEqual(gotten_comment_list_for_user2_post.status_code, 200)
        self.assertEqual(len(gotten_comment_list_for_user2_post.json()), 0)
