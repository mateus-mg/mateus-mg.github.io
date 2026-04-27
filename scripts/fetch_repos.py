#!/usr/bin/env python3
"""
Fetch public repositories from GitHub API and save to data/repos.json.
Intended to run inside GitHub Actions workflow.
"""

import json
import os
import sys
import urllib.request
from urllib.error import HTTPError

GITHUB_USERNAME = "mateus-mg"
OUTPUT_PATH = "data/repos.json"
API_URL = f"https://api.github.com/users/{GITHUB_USERNAME}/repos?per_page=100&sort=updated"


def fetch_repos():
    """Fetch repositories from GitHub API."""
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": f"{GITHUB_USERNAME}-portfolio-fetcher",
    }

    # Use GITHUB_TOKEN if available for higher rate limits
    token = os.environ.get("GITHUB_TOKEN")
    if token:
        headers["Authorization"] = f"Bearer {token}"

    req = urllib.request.Request(API_URL, headers=headers)

    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode("utf-8"))
    except HTTPError as e:
        print(f"HTTP Error {e.code}: {e.reason}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error fetching repos: {e}", file=sys.stderr)
        sys.exit(1)


def transform_repos(repos):
    """Extract only the fields we need."""
    return [
        {
            "name": repo.get("name"),
            "description": repo.get("description") or "No description available.",
            "html_url": repo.get("html_url"),
            "language": repo.get("language"),
            "stargazers_count": repo.get("stargazers_count", 0),
            "topics": repo.get("topics", []),
            "updated_at": repo.get("updated_at"),
        }
        for repo in repos
        # Optionally filter out forks: uncomment next line
        # if not repo.get("fork", False)
    ]


def save_repos(repos):
    """Write repos to JSON file."""
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(repos, f, indent=2, ensure_ascii=False)
    print(f"Saved {len(repos)} repositories to {OUTPUT_PATH}")


def main():
    raw_repos = fetch_repos()
    clean_repos = transform_repos(raw_repos)
    save_repos(clean_repos)


if __name__ == "__main__":
    main()
