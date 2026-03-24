"""Отправка Telegram-уведомления при новой покупке в донат-магазине multiWORLD"""
import os
import json
import urllib.request


TELEGRAM_API = "https://api.telegram.org/bot{token}/sendMessage"


def handler(event: dict, context) -> dict:
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    nick = body.get("nick", "???")
    rank = body.get("rank", "???")
    price = body.get("price", 0)

    token = os.environ.get("TELEGRAM_BOT_TOKEN", "")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "")

    if not token or not chat_id:
        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": {"ok": False, "error": "Telegram not configured"},
        }

    text = (
        f"🎮 *Новая покупка — multiWORLD*\n\n"
        f"👤 Ник: `{nick}`\n"
        f"🏆 Товар: *{rank}*\n"
        f"💰 Сумма: *{price} ₽*\n\n"
        f"_Игрок перешёл на оплату ЮMoney_"
    )

    data = json.dumps({
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "Markdown",
    }).encode("utf-8")

    req = urllib.request.Request(
        TELEGRAM_API.format(token=token),
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=10) as resp:
        result = json.loads(resp.read())

    return {
        "statusCode": 200,
        "headers": cors_headers,
        "body": {"ok": result.get("ok", False)},
    }
