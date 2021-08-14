# match-tag-to-package-version

A github action that makes sure that git tag and version in package.json match

# Usage

You can safeguard that your package.json and your git tag matches using this action and proceed to release after the check successfully ran.

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
        id: match-tag-to-package-version
        uses: geritol/match-tag-to-package-version@0.1.0
        with:
          TAG_PREFIX: v # Optional, default prefix is ""
          # TAG_PREFIX may also be defined under the 'env' key. 
```

The action outputs package.json version as `PACKAGE_VERSION` and the tag (without 'refs/tags/') as `TAG_VERSION`.  
Eg. use it as `steps.match-tag-to-package-version.outputs.PACKAGE_VERSION` in other steps.
