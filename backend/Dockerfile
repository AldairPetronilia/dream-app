FROM python:3.13-slim

WORKDIR /app

ADD . .

RUN pip install uv
RUN uv sync

EXPOSE 8080:5000

CMD ["uv", "run", "src/main.py"]