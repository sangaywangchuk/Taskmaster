# !/bin/bash

set -e

# Check if eslint is present in package.json
if grep -q "eslint" package.json; then
echo "Eslint is present in package.json"
else
echo "Eslint is not present in package.json"
fi

# Check if .eslintrc.json file is present or not
if [ -f ".eslintrc.json" ]; then
  echo ".eslintrc.json exists."
else
  echo ".eslintrc.json does not exist."
  exit 1;  
fi

# Run ESLint on modified TypeScript files and output report to JSON file
if eslint $(git diff --name-only HEAD -- '*.ts' | xargs ) --quiet --format json --output-file eslint-report.json; then
  echo "No linting issues found"
fi

# Check if the ESLint report file exists, is readable, and is not empty
if [ ! -f "eslint-report.json" ]; then
  echo "ESLint report file not found."
  exit 1;
elif [ ! -s "eslint-report.json" ]; then
  echo "ESLint report file is empty."
  exit 1;
fi

echo "Eslint check finished Successfully"