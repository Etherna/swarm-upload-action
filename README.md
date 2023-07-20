# Swarm Upload

Upload your dapp to the Swarm decentralized storage (https://www.ethswarm.org/).

## Usage

```
- name: Upload to swarm
  uses: Etherna/swarm-upload-action@2.0.0
  with:
    gateway: https://gateway.etherna.io
    ethernaApiKey: ${{ secrets.ETHERNA_API_KEY }}
    localRoot: build
    defaultPath: index.html
    batchId: ${{ secrets.BATCH_ID }}
    feedName: MyWebsite
    feedUserPrivateKey: ${{ secrets.PRIVATE_KEY }}
```

## Options

| Variable             | Example                         | Default value | Description                                                                                              |
| -------------------- | ------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------- |
| `localRoot`          | build                           |               | Local folder to upload                                                                                   |
| `gateway`            | https://gateway.etherna.io      |               | Swarm Gateway Host                                                                                       |
| `ethernaApiKey`      | xxxxxxxxx.xxxxxxxxxxxxxxxxxxxxx |               | Etherna Api key (optional / required for `https://gateway.etherna.io` get one at https://sso.etherna.io) |
| `defaultPath`        | index.html                      |               | Default path (optional)                                                                                  |
| `errorPath`          | error.html                      |               | Error path (optional)                                                                                    |
| `batchId`            | 6a6176690...6a6176690           | 00000...(x64) | Batch Id used to upload data (optional)                                                                  |
| `feedName`           | MyWebsite                       |               | Feed topic name (optional)                                                                               |
| `feedUserPrivateKey` | 617610264fc...87897bf1c1c       |               | Feed user (optional / required to update feed)                                                           |

To update a feed you must specify one between `feedTopic` and `feedName`, as well as the `feedUserPrivateKey`.

## Issues

We collect feedbacks with Jira:
https://etherna.atlassian.net/projects/SUA/issues
