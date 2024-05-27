#!/bin/sh
if ! [ -f ~/.gnupg/trustdb.gpg ] ; then
  chmod 700 ~/.gnupg/
  gpg --quick-generate-key stripe-live # This will generate a gpg key called "stripe-live"
fi
if ! [ -f ~/.password-store/.gpg-id ] ; then
  pass init stripe-live # This will initialize a password store record named "stripe-live", using the gpg key above
  pass insert stripe-live # This will insert value for the password store "stripe-live", which we will put Stripe Live Secret Key in
fi

string="$@"
liveflag="--live"

if [ -z "${string##*$liveflag*}" ] ;then
  OPTS="--api-key sk_test_51P8e8rIhAKKn6PL71bu4WWVMFqC4szrwVTggoGxO85l54N7ULlHO8DWfBb8HLLCTN4dBWAj8R4zxGaAxwJj6eTPG001O6VxYQO" # This will use the content of the password store "stripe-live" which was inserted in line 8
  # OPTS="--api-key $(pass show stripe-live)" # This will use the content of the password store "stripe-live" which was inserted in line 8
fi

#pass insert stripe-live
/bin/stripe  $@ $OPTS