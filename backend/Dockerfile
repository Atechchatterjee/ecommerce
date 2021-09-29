FROM python:3

ENV PYTHONUNBUFFERED=1

WORKDIR /src

COPY requirements.txt ./

COPY ./src /src/

RUN pip install -r requirements.txt