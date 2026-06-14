# ETHOS Reproducible Builds

ETHOS publishes release receipts so supporters with source access can rebuild
the public web app and compare the output with the deployed release.

Public users can inspect the release manifest and SHA-256 sums. Supporters
with read-only source access can additionally run the build from source and
compare hashes.

GitHub artifact attestations will be published when repository support is
available. GitHub does not currently make this feature available for all
private repository configurations, so the active verification path is the
release manifest plus SHA-256 hash comparison.

## What To Verify

Each public release should include:

- `trust/release-manifest.json`
- `trust/SHA256SUMS`
- A GitHub artifact attestation for the release artifact, when repository
  support is available

The release manifest records the source revision, GitHub Actions run metadata,
Node.js version, npm version, lockfile hash, and app artifact hashes.

`SHA256SUMS` records deterministic hashes for files in the built app. The
generated receipt files are excluded from the app hash set because they include
release metadata that can differ between the official build and a local rebuild.

## Supporter Verification Steps

From a clean checkout of the source revision named in
`trust/release-manifest.json`:

```bash
npm ci
npm run lint
npm test
npm run build:release
```

Then compare the generated local app hashes with the public release hashes:

```bash
diff -u dist/trust/SHA256SUMS path/to/public-release/trust/SHA256SUMS
```

If the app artifact hashes match, the local source rebuild produced the same
public app files as the release receipt.

## GitHub Attestations

GitHub artifact attestations prove that GitHub Actions produced a named build
artifact from a specific workflow run and repository context. They are useful
release provenance, but they are not the same thing as a maintainer GPG
signature or an independent security audit.

If the source repository is private and GitHub rejects attestation creation,
the deploy workflow skips the attestation step and publishes the release
receipt files instead.

Use attestations to answer:

- Which workflow produced this artifact?
- Which source revision was used?
- Was the artifact produced by GitHub Actions for the expected repository?

Do not use attestations to claim:

- A human maintainer personally reviewed every file in the release.
- The implementation is independently audited.
- The source repository cannot be compromised.

## If Hashes Do Not Match

If a supporter rebuild does not match the public hashes:

1. Confirm the exact source revision from `release-manifest.json`.
2. Confirm Node.js and npm versions.
3. Run `npm ci`, not `npm install`.
4. Rebuild from a clean checkout.
5. Compare the differing file paths in `SHA256SUMS`.

If the mismatch remains, treat it as a release integrity issue and report it
publicly. ETHOS should either explain the difference or publish a corrected
release receipt.
