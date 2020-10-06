# eslint-code-climate

Based on the work of [jdanil/eslint-config-code-smells](https://github.com/jdanil/eslint-config-code-smells)

NOTE: This is a _**TypeScript**_ only project at this time. It expects:

- TypeScript 3
- ESLint 7
- Prettier

## Operation

When this configuration is included in a project, it loads 2 configuration files:

The following local configuration is supported:

| Config File        | Parameter             | ESLint Parameter         |
| ------------------ | --------------------- | ------------------------ |
| `.prettierrc`      | `printWidth`          | `max-len`                |
| `.codeclimate.yml` | `argument-count`      | `max-params`             |
| `.codeclimate.yml` | `complex-logic`       | `complexity`             |
| `.codeclimate.yml` | `file-lines`          | `max-lines`              |
| `.codeclimate.yml` | `method-lines`        | `max-lines-per-function` |
| `.codeclimate.yml` | `nested-control-flow` | `max-nested-callbacks`   |

The following code-climate parameters do not have an ESLint equivalent:

| Config File        | Parameter           | ESLint Parameter |
| ------------------ | ------------------- | ---------------- |
| `.codeclimate.yml` | `method-complexity` | `--`             |
| `.codeclimate.yml` | `method-count`      | `--`             |
| `.codeclimate.yml` | `return-statements` | `--`             |

## Adding to your project
