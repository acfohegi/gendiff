install: 
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > ./cc-test-reporter
	chmod +x ./cc-test-reporter
    ./cc-test-reporter format-coverage -t lcov -o coverage/codeclimate.json coverage/lcov.info
    ./cc-test-reporter -r $CC_TEST_REPORTER_ID upload-coverage
