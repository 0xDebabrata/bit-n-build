FROM python:3.9-slim

WORKDIR /usr/src/app

COPY . .

RUN pip install -r requirements.txt

ENV PORT=8000

EXPOSE $PORT

CMD python3 -m uvicorn main:app --host 0.0.0.0 --port $PORT
