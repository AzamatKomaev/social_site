from django.test import TestCase
from django.contrib.auth.models import User

from selenium import webdriver
from selenium.webdriver.firefox.options import Options

from social.settings import BASE_DIR


class ChatTest(TestCase):
    user1: User
    user2: User
    driver: webdriver

    def setUp(self):
        path_to_geckodriver = str(BASE_DIR) + "/geckodriver"
        self.driver = webdriver.Firefox(
            executable_path=path_to_geckodriver,
            options=webdriver.FirefoxOptions()
        )

    def tearDown(self):
        self.driver.quit()

    def test_main_page_title(self):
        content = self.driver.page_source
