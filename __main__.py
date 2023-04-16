from dotenv import load_dotenv

from main import Server

if __name__ == '__main__':
    load_dotenv()
    Server().run()
