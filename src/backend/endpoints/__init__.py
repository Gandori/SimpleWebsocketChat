import typing

from fastapi import APIRouter

from . import auth_router, websocket_router

routers: typing.List[APIRouter] = [websocket_router.router, auth_router.router]
