# match-tag-to-package-version

A github action that makes sure that git tag and version in package.json match

# Usage

You can safeguard that your package.json and your git tag matches using this action and proceed to release after the check sucessfully ran.

```yaml
name: Release

on:
  push:
    tags:
      - "*"

jobs:
  setup:
    name: Setup
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master

      - name: match-tag-to-package-version
        uses: geritol/match-tag-to-package-version@0.0.2
        env:
          TAG_PREFIX: refs/tags/v # Optional, default prefix refs/tags/
```
