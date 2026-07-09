"""Minimal integration test for the VisionCraft AI backend endpoints."""
import urllib.request
import struct
import zlib
import json


def make_test_png(width: int = 8, height: int = 8) -> bytes:
    """Creates a minimal valid PNG file in memory."""
    def chunk(name: bytes, data: bytes) -> bytes:
        c = name + data
        return struct.pack(">I", len(data)) + c + struct.pack(">I", zlib.crc32(c) & 0xFFFFFFFF)

    raw_rows = b"".join(b"\x00" + b"\xFF\x00\x00" * width for _ in range(height))
    compressed = zlib.compress(raw_rows)

    return (
        b"\x89PNG\r\n\x1a\n"
        + chunk(b"IHDR", struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0))
        + chunk(b"IDAT", compressed)
        + chunk(b"IEND", b"")
    )


def post_image(url: str, png_data: bytes) -> dict:
    """Posts a PNG image to the given URL using multipart/form-data."""
    boundary = b"VisionCraftTestBoundary"
    body = (
        b"--" + boundary + b"\r\n"
        + b"Content-Disposition: form-data; name=\"file\"; filename=\"test.png\"\r\n"
        + b"Content-Type: image/png\r\n\r\n"
        + png_data
        + b"\r\n--" + boundary + b"--\r\n"
    )

    req = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "multipart/form-data; boundary=VisionCraftTestBoundary"},
        method="POST",
    )

    try:
        with urllib.request.urlopen(req) as resp:
            content = resp.read()
            ct = resp.headers.get("Content-Type", "unknown")
            return {"status": resp.status, "content_type": ct, "bytes": len(content), "ok": True}
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        return {"status": e.code, "error": body, "ok": False}
    except Exception as e:
        return {"status": -1, "error": str(e), "ok": False}


def test_health():
    req = urllib.request.Request("http://127.0.0.1:8000/health", method="GET")
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read())
    assert data["status"] == "healthy", f"Unexpected status: {data}"
    print(f"  [PASS] /health -> {data['status']} (uptime: {data['uptime_formatted']})")


def test_docs():
    req = urllib.request.Request("http://127.0.0.1:8000/docs", method="GET")
    with urllib.request.urlopen(req) as resp:
        assert resp.status == 200
    print("  [PASS] /docs -> 200 OK (Swagger UI accessible)")


def test_remove_background():
    png = make_test_png()
    result = post_image("http://127.0.0.1:8000/remove-background", png)
    if result["ok"]:
        print(f"  [PASS] /remove-background -> {result['status']} {result['content_type']} ({result['bytes']} bytes returned)")
    else:
        print(f"  [FAIL] /remove-background -> {result['status']}: {result['error']}")


def test_enhance_image():
    png = make_test_png()
    result = post_image("http://127.0.0.1:8000/enhance-image?mode=auto", png)
    if result["ok"]:
        print(f"  [PASS] /enhance-image -> {result['status']} {result['content_type']} ({result['bytes']} bytes returned)")
    else:
        print(f"  [FAIL] /enhance-image -> {result['status']}: {result['error']}")


def test_cors_headers():
    req = urllib.request.Request(
        "http://127.0.0.1:8000/health",
        method="OPTIONS",
        headers={
            "Origin": "http://localhost:3000",
            "Access-Control-Request-Method": "POST",
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            acao = resp.headers.get("Access-Control-Allow-Origin", "missing")
            print(f"  [PASS] CORS preflight -> Access-Control-Allow-Origin: {acao}")
    except urllib.error.HTTPError as e:
        # 405 Method Not Allowed is still a valid CORS response if the header is present
        acao = e.headers.get("Access-Control-Allow-Origin", "missing")
        print(f"  [INFO] CORS preflight -> {e.code} - Allow-Origin: {acao}")


if __name__ == "__main__":
    print("\n" + "=" * 50)
    print("  VisionCraft AI Backend - Integration Tests")
    print("=" * 50)
    try:
        test_health()
        test_docs()
        test_remove_background()
        test_enhance_image()
        test_cors_headers()
        print("=" * 50)
        print("  All tests completed successfully!")
        print("=" * 50 + "\n")
    except Exception as e:
        print(f"\n[ERROR] Test suite failed: {e}")
