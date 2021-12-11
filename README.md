# Swarm Upload
Upload your dapp to the Swarm decentralized storage (Bee v1.4.1).

## Usage
```
- name: Upload to swarm
  uses: Etherna/swarm-upload-action@1.0.0
  with:
    localRoot: build
    defaultPath: index.html
    batchId: ${{ secrets.BATCH_ID }}
    feedName: MyWebsite
    feedUserPrivateKey: ${{ secrets.PRIVATE_KEY }}
```

## Options
| Variable             | Example                         | Default value                                                    | Description                                    |
|----------------------|---------------------------------|------------------------------------------------------------------|------------------------------------------------|
| `localRoot`          | build                           |                                                                  | Local folder to upload                         |
| `gateway`            | https://custom-swarm-gateway.io | https://swarm-gateway.net                                        | Swarm Gateway Host                             |
| `defaultPath`        | index.html                      |                                                                  | Default path (optional)                        |
| `errorPath`          | error.html                      |                                                                  | Error path (optional)                          |
| `batchId`            | 6a6176690...6a6176690           | 0000000000000000000000000000000000000000000000000000000000000000 | Batch Id used to upload data (optional)        |
| `feedName`           | MyWebsite                       |                                                                  | Feed topic name (optional)                     |
| `feedUserPrivateKey` | 617610264fc...87897bf1c1c       |                                                                  | Feed user (optional / required to update feed) |

To update a feed you must specify one between `feedTopic` and `feedName`, as well as the `feedUserPrivateKey`.

## Issues
We collect feedbacks with Jira:
https://etherna.atlassian.net/projects/SUA/issues
