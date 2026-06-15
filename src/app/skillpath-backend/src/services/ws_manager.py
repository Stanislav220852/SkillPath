from fastapi import WebSocket
from typing import Dict, Set


class ConnectionManager:
    """Manages WebSocket connections for real-time chat."""

    def __init__(self):
        # mentor_id -> set of (websocket, user_id)
        self._mentor_connections: Dict[int, Set[tuple]] = {}
        # general chat connections
        self._general_connections: Set[tuple] = set()
        # direct chat: room_id -> set of (websocket, user_id)
        self._direct_connections: Dict[str, Set[tuple]] = {}

    # ── Mentor chat ───────────────────────────────────────────

    async def connect(self, websocket: WebSocket, mentor_id: int, user_id: int):
        await websocket.accept()
        if mentor_id not in self._mentor_connections:
            self._mentor_connections[mentor_id] = set()
        self._mentor_connections[mentor_id].add((websocket, user_id))

    def disconnect(self, websocket: WebSocket, mentor_id: int):
        if mentor_id in self._mentor_connections:
            self._mentor_connections[mentor_id] = {
                (ws, uid) for ws, uid in self._mentor_connections[mentor_id]
                if ws != websocket
            }
            if not self._mentor_connections[mentor_id]:
                del self._mentor_connections[mentor_id]

    async def send_to_mentor(self, mentor_id: int, message: dict):
        connections = self._mentor_connections.get(mentor_id, set())
        for ws, _ in connections:
            try:
                await ws.send_json(message)
            except Exception:
                pass

    async def send_to_user(self, mentor_id: int, user_id: int, message: dict):
        connections = self._mentor_connections.get(mentor_id, set())
        for ws, uid in connections:
            if uid == user_id:
                try:
                    await ws.send_json(message)
                except Exception:
                    pass

    def get_mentor_connections(self, mentor_id: int) -> Set[tuple]:
        return self._mentor_connections.get(mentor_id, set())

    # ── General chat ──────────────────────────────────────────

    async def connect_general(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self._general_connections.add((websocket, user_id))

    def disconnect_general(self, websocket: WebSocket):
        self._general_connections = {
            (ws, uid) for ws, uid in self._general_connections if ws != websocket
        }

    async def broadcast_general(self, message: dict, exclude_user_id: int = None):
        for ws, uid in self._general_connections:
            if uid == exclude_user_id:
                continue
            try:
                await ws.send_json(message)
            except Exception:
                pass

    # ── Direct messages ───────────────────────────────────────

    async def connect_direct(self, websocket: WebSocket, room_id: str, user_id: int):
        await websocket.accept()
        if room_id not in self._direct_connections:
            self._direct_connections[room_id] = set()
        self._direct_connections[room_id].add((websocket, user_id))

    def disconnect_direct(self, websocket: WebSocket, room_id: str):
        if room_id in self._direct_connections:
            self._direct_connections[room_id] = {
                (ws, uid) for ws, uid in self._direct_connections[room_id]
                if ws != websocket
            }
            if not self._direct_connections[room_id]:
                del self._direct_connections[room_id]

    async def send_to_direct(self, room_id: str, message: dict, exclude_user_id: int = None):
        connections = self._direct_connections.get(room_id, set())
        for ws, uid in connections:
            if uid == exclude_user_id:
                continue
            try:
                await ws.send_json(message)
            except Exception:
                pass


manager = ConnectionManager()
