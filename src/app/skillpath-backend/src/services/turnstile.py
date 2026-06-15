import httpx
from src.core.config import settings

TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"


async def verify_turnstile(token: str, remote_ip: str = "") -> bool:
    """Verify Cloudflare Turnstile token. Returns True if valid or if Turnstile is disabled."""
    if not settings.TURNSTILE_ENABLED or not settings.TURNSTILE_SECRET_KEY:
        return True

    if not token:
        return False

    async with httpx.AsyncClient() as client:
        resp = await client.post(
            TURNSTILE_VERIFY_URL,
            data={
                "secret": settings.TURNSTILE_SECRET_KEY,
                "response": token,
                "remoteip": remote_ip,
            },
            timeout=10.0,
        )
        result = resp.json()
        return result.get("success", False)
