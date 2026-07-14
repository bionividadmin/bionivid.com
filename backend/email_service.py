import asyncio
import os

import requests


RESEND_EMAILS_URL = "https://api.resend.com/emails"


async def send_email(*, to: str, subject: str, html: str) -> None:
    """Send one HTML email through Resend without blocking the event loop."""
    api_key = os.getenv("RESEND_API_KEY")
    sender_email = os.getenv("SENDER_EMAIL")
    sender_name = os.getenv("SENDER_NAME")

    if not api_key or not sender_email or not sender_name:
        raise RuntimeError("Resend email settings are not configured")

    payload = {
        "from": f"{sender_name} <{sender_email}>",
        "to": [to],
        "subject": subject,
        "html": html,
    }
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    def _post_email() -> None:
        response = requests.post(
            RESEND_EMAILS_URL,
            headers=headers,
            json=payload,
            timeout=15,
        )
        if not response.ok:
            print("Status:", response.status_code)
            print("Response:", response.text)

        response.raise_for_status()

    await asyncio.to_thread(_post_email)
