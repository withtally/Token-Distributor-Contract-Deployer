# TESTING WITH TASKS

You have to substitute the address of course in accord to the outputs you get.

If you want to use a specific Account, you have to fill it's private key in the localhost `package.json`.

also run in another terminal:

`npx hardhat node`

----------
# CREATE TOKEN

```bash
npx hardhat token --network localhost
```

-----------
### Sample output:

    Deploying an sample Token contract for local testing
    network:localhost 
    signer address:0xcd3B766CCDd6AE721141F452C550Ca635964ce71

    Token Distributor deployed to: 0x162459Bb429a63D2e31Fe2d1cdb5b058f2D31AdF 
    Creation block number: 1

-----------
# CREATE TOKEN DISTRIBUTOR

```bash
# Check if the system is macOS
if [[ $(uname) == "Darwin" ]]; then
    # For macOS, use the -v option with date to add 1 minute and 24 hours
    start_epoch=$(date -v+1M '+%s')
    end_epoch=$(date -v+1d '+%s')
else
    # For Linux, use the -d option to calculate the epoch unix time
    start_epoch=$(date -d '+1 minute' '+%s')
    end_epoch=$(date -d '+24 hours' '+%s')
fi

# Run the command with updated start and end times
npx hardhat tokenDistributor --network localhost \
    --root 0xae1b08655703dc89f64177d04982f7644b008d9e4dcbf6aa686698d4128c2406 \
    --token 0x162459Bb429a63D2e31Fe2d1cdb5b058f2D31AdF \
    --total 13800000000000000000000 \
    --start "$start_epoch" \
    --end "$end_epoch" \
    --delegate 0xf8533db72dcba94bf14a3C147A550Ae99d5F5daE
```

-----------
### Sample output:

    Deploying a Token Distributor contract
    network:localhost 
    signer address:0xcd3B766CCDd6AE721141F452C550Ca635964ce71

    root: 0xae1b08655703dc89f64177d04982f7644b008d9e4dcbf6aa686698d4128c2406 
    token: 0x162459Bb429a63D2e31Fe2d1cdb5b058f2D31AdF 
    total: 13800000000000000000000 
    start: 1701462737 
    end: 1701549077 
    delegate: 0xf8533db72dcba94bf14a3C147A550Ae99d5F5daE 
    Token Distributor deployed to: 0xDAEaB5ef86487b4f777A80dFa9BC0DE6878d7607 
    Creation block number: 2

    npx hardhat verify --network localhost 0xDAEaB5ef86487b4f777A80dFa9BC0DE6878d7607 "0xae1b08655703dc89f64177d04982f7644b008d9e4dcbf6aa686698d4128c2406" "0x162459Bb429a63D2e31Fe2d1cdb5b058f2D31AdF" 13800000000000000000000 1701462737 1701549077 0xf8533db72dcba94bf14a3C147A550Ae99d5F5daE

-----------
# TRANSFER TO TOKEN DISTRIBUTOR

```bash

npx hardhat transfer --network localhost \
    --to 0xDAEaB5ef86487b4f777A80dFa9BC0DE6878d7607 \
    --amount 13800000000000000000000 \
    --token 0x162459Bb429a63D2e31Fe2d1cdb5b058f2D31AdF
```

-------------
### Sample output:

    Transfer tokens...
    network:localhost 
    signer address:0xcd3B766CCDd6AE721141F452C550Ca635964ce71

    Tokens transfered successfully!
-------------
# CLAIM

```bash
npx hardhat claim --network localhost \
    --distributor 0xDAEaB5ef86487b4f777A80dFa9BC0DE6878d7607 \
    --json files/example.json

# OR
npx hardhat claim_delegate --network localhost \
    --distributor 0xDAEaB5ef86487b4f777A80dFa9BC0DE6878d7607 \
    --json files/example.json \
    --delegate [optional]
```

-------------
### Sample output:

    Claiming tokens from the token distributor...
    network:localhost 
    signer address:0xcd3B766CCDd6AE721141F452C550Ca635964ce71

    Tokens claimed successfully!

    OR

    Claiming tokens from the token distributor...
    network:localhost 
    signer address:0xcd3B766CCDd6AE721141F452C550Ca635964ce71

    Tokens claimed and delegated successfully!
