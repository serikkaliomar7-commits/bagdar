#!/bin/bash
# Жергілікті іске қосу: .env-тен айнымалыларды оқып, серверді қосады.
cd "$(dirname "$0")"
set -a; [ -f .env ] && source .env; set +a
PORT="${PORT:-8000}"
if lsof -ti tcp:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Порт $PORT уже занят — сервер, скорее всего, уже запущен: http://127.0.0.1:$PORT"
  echo "Остановить его: lsof -ti tcp:$PORT -sTCP:LISTEN | xargs kill"
  exit 1
fi
echo "Bağdar: http://127.0.0.1:$PORT   ·   админка: http://127.0.0.1:$PORT/admin"
exec python3 -m uvicorn server.app:app --host 127.0.0.1 --port "$PORT"
