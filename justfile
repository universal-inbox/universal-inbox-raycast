default:
    @just --choose

# Build Universal Inbox extension for Raycast
build:
    npm run build

# Lint extension code
lint:
    npm run lint

# Lint and fix extension code
fix:
    npm run fix-lint

# Run extension in development mode
run:
    npm run dev
