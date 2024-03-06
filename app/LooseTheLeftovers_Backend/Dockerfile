FROM python:3.11.6-slim-bullseye

ENV PYTHONUNBUFFERED 1 
ENV PYTHONDONTWRITEBYTECODE 1
ENV PIP_DISABLE_PIP_VERSION_CHECK 1

WORKDIR /src

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev \
    && apt-get install -y binutils libproj-dev gdal-bin\
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt . 

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

ENTRYPOINT ["/src/django.sh"]