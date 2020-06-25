# Transaction process

This is the transaction process that the Flex Template for Web is designed to work with by default.
The `process.edn` file describes the process flow while the `templates` folder contains notification
messages that are used by the process.

Bookings in the process are day-based. Pricing uses privileged transitions and
the
[privileged-set-line-items](https://www.sharetribe.com/docs/references/transaction-process-actions/#actionprivileged-set-line-items)
action. The process has preauthorization and it relies on the provider to accept
booking requests.
