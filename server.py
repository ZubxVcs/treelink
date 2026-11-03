import os
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.middleware.gzip import GZipMiddleware

app = FastAPI(title="Karl Linktree (treelink)")
app.add_middleware(GZipMiddleware, minimum_size=500)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.middleware("http")
async def add_cache_headers(request: Request, call_next):
    response = await call_next(request)
    path = request.url.path
    if path.endswith((".css", ".js", ".webp", ".jpeg", ".jpg", ".png", ".ico")):
        response.headers["Cache-Control"] = "public, max-age=86400, stale-while-revalidate=604800"
    return response

@app.get("/")
async def serve_index():
    return FileResponse(os.path.join(BASE_DIR, "index.html"), media_type="text/html")

app.mount("/", StaticFiles(directory=BASE_DIR, html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8092)
