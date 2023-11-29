FROM python:3.10
ENV PYTHONBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
COPY /.bittensor /root/.bittensor
WORKDIR /app
COPY . .
RUN pip3 install -U pip setuptools
RUN pip3 install -r requirements.txt
