FROM  stripe/stripe-cli
RUN  apk  add  pass  gpg-agent
COPY  ./entrypoint.sh  /entrypoint.sh
ENTRYPOINT  [ "/entrypoint.sh" ]
CMD ["listen", "--skip-verify", "--api-key", "sk_test_51P8e8rIhAKKn6PL71bu4WWVMFqC4szrwVTggoGxO85l54N7ULlHO8DWfBb8HLLCTN4dBWAj8R4zxGaAxwJj6eTPG001O6VxYQO", "--forward-to" ,"http://backend/api/webhook/stripe", "--log-level", "error"]