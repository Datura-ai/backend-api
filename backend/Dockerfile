FROM python:3.10
ENV PYTHONUNBUFFERED=1
WORKDIR /app

COPY /.bittensor /root/.bittensor
COPY /requirements.txt /root/requirements.txt
RUN pip3 install -r /root/requirements.txt

COPY . .
