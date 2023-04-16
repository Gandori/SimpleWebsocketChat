import typing

from fastapi import FastAPI
from pydantic import BaseSettings


class Service(BaseSettings):
    title: str = 'Example'
    version: str = '0.0.0'
    docs_url: typing.Union[str, None] = None
    redocs_url: typing.Union[str, None] = None
    prefix: str = ''

    def __init__(self) -> None:
        super().__init__()

    def create(self) -> FastAPI:
        service: FastAPI = FastAPI(
            title=self.title,
            version=self.version,
            docs_url=self.docs_url,
            redoc_url=self.redocs_url,
        )

        return service
