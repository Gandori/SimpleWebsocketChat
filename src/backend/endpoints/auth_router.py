from fastapi import APIRouter

from .auth_schemas import User

router = APIRouter()
router.tags = ['Auth']


@router.post('/signin')
def signin(user: User):
    return user.username
