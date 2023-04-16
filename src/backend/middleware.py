import pydantic
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


class Middleware(pydantic.BaseModel):
    secret_key: str = 'secret-key'
    cookie_name: str = 'cookie_name'
    allowed_hosts: str = 'localhost,example.de'

    def __init__(self) -> None:
        super().__init__()

    def setup(self, app: FastAPI):
        app.add_middleware(
            middleware_class=CORSMiddleware,
            allow_origins=['*'],
            allow_credentials=True,
            allow_methods=['*'],
            allow_headers=['*'],
        )
