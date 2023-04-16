import json
import typing

from fastapi import WebSocket, WebSocketDisconnect


class WebsocketManager:
    def __init__(self) -> None:
        self.active_connections: typing.List[typing.Dict] = []
        self.active_users: typing.List[str] = []
        self.fake_db: typing.List[str] = []

    async def connect(self, websocket: WebSocket, username: str) -> None:
        await websocket.accept()

        user: typing.Dict = {
            'username': username,
            'websocket': websocket,
        }
        self.active_connections.append(user)
        self.active_users.append(username)

        await self.broadcast(message=self.fake_db)

        try:
            while True:
                data: str = await websocket.receive_text()
                self.fake_db[0:0] = [json.loads(data)]
                await self.broadcast(message=self.fake_db)
        except WebSocketDisconnect:
            self.active_connections.remove(user)
            self.active_users.remove(username)
            await self.broadcast(message=self.fake_db)
            print('Disconnected')

    async def send(self, websocket: WebSocket, message: str) -> None:
        await websocket.send_json({'message': message})

    async def broadcast(self, message: typing.List[str]) -> None:
        for connection in self.active_connections:
            await connection['websocket'].send_json(
                {'user': self.active_users, 'message': message}
            )
