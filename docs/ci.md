# CI

The application provides a configuration to use [CircleCI](https://circleci.com/) as a continuous
integration server to run tests and other scripts. This ensures quality and can be forced to avoid
merging changes that break tests or fail audits.

The [circle.yml](../circle.yml) file is used to configure CircleCI.

Currently the CI runs the following scripts:

## Security audit: `yarn run audit`

This command runs the security audit using [nsp](https://www.npmjs.com/package/nsp). The audit
checks for installed packages with known vulnerabilities and warns about those.

The scripts outputs information about the dependency path that added the package. If that
information is not enough, `yarn why package-name` can be used to get more detailed information
about why the package is installed.

If you are convinced that the vulnerability can be ignored, exceptions can be added to the
[.nsprc](../.nsprc) file.

## Code formatting: `yarn run format-ci`

This command fails if there are changes in the formatting that are not committed. Run
`yarn run format` to format the code and get rid of the error.

## Build: `yarn run build`

This command ensures that the build passes.

## Tests: `yarn run test-ci`

This command runs the tests.
