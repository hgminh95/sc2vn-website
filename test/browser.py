import unittest
from selenium import webdriver

class Tester(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.driver = webdriver.Firefox()

    def testHeader(self):
        self.driver.get("https://localhost:3000/")
        title = self.driver.title
        self.assertEqual(title, "Articles")

    def testArticleShow(self):
        self.driver.get("https://localhost:3000/")
        button = self.driver.find_elements_by_link_text('New Article')
        self.assertEqual(len(button), 0)

    @classmethod
    def tearDownClass(self):
        self.driver.quit()

if __name__ == '__main__':
    unittest.main()
