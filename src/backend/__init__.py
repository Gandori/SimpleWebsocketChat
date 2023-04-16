from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from src.backend import endpoints, middleware, service

new_service: service.Service = service.Service()

app: FastAPI = new_service.create()

new_middlewares = middleware.Middleware()

new_middlewares.setup(app=app)


prefix: str = new_service.prefix

for router in endpoints.routers:
    app.include_router(router=router, prefix=prefix)


app.mount("/static", StaticFiles(directory='src/frontend/build/static'))
templates = Jinja2Templates(directory='src/frontend/build')


@app.get('/')
async def index(request: Request):
    return templates.TemplateResponse('index.html', {'request': request})
