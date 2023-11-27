# Stage 1: Build
FROM python:3.9 as builder

WORKDIR /app
COPY ./requirements.txt .
RUN pip install --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

COPY . .

# Stage 2: Runtime
FROM python:3.9-slim

WORKDIR /app

RUN pip install flask

COPY --from=builder /app /app
COPY --from=builder /usr/local/lib/python3.9 /usr/local/lib/python3.9

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

CMD ["flask", "run"]