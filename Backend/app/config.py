from pathlib import Path

from dotenv import load_dotenv


BACKEND_DIR = Path(__file__).resolve().parents[1]
ENV_FILE = BACKEND_DIR / ".env"


def load_backend_env():
    load_dotenv(dotenv_path=ENV_FILE)
