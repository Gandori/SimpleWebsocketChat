from fastapi import APIRouter, WebSocket

from src.backend.websocket.websocket import WebsocketManager

router = APIRouter()
router.tags = ['Websocket']

manager: WebsocketManager = WebsocketManager()


@router.websocket('/ws/{username}')
async def websocket_endpoint(username: str, websocket: WebSocket):
    await manager.connect(websocket=websocket, username=username)
