# Swarm Upload
Upload your dapp to the Swarm decentralized storage.

## Usage
```
- name: Upload to swarm
  uses: Etherna/swarm-upload-action@0.1
  with:
    localRoot: build
    defaultPath: index.html
    feedName: MyWebsite
    feedUserPrivateKey: ${{ secrets.PRIVATE_KEY }}
```

## Options
| Variable             | Example                         | Default value             | Description                                    |
|----------------------|---------------------------------|---------------------------|------------------------------------------------|
| `localRoot`          | build                           |                           | Local folder to upload                         |
| `gateway`            | https://custom-swarm-gateway.io | https://swarm-gateway.net | Swarm Gateway Host                             |
| `defaultPath`        | index.html                      |                           | Default path                                   |
| `feedTopic`          | 0x6a6176690...00000000000       |                           | Feed topic hash (optional)                     |
| `feedName`           | MyWebsite                       |                           | Feed topic name (optional)                     |
| `feedUserPrivateKey` | 617610264fc...87897bf1c1c       |                           | Feed user (optional / required to update feed) |

To update a feed you must specify one between `feedTopic` and `feedName`, as well as the `feedUserPrivateKey`.