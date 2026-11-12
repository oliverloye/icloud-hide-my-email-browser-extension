"""Turn on the versioned git hooks in every Claude session, cloud and local.

Git ignores .githooks/ until core.hooksPath points at it, and a fresh clone
does not carry that setting. Never fails the session start.
"""
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[2]
subprocess.run(["git", "config", "core.hooksPath", ".githooks"], cwd=root, check=False)
