import { keccak_256 } from "@noble/hashes/lib/sha3"
import { getPublicKey } from "@noble/secp256k1"

export function privateToAddress(privateKey: string) {
  const pubKey = getPublicKey(Buffer.from(privateKey.replace(/^(0x)?/, ""), "hex")).slice(1) as Buffer
  const keccakAddress = keccak_256(pubKey) as Buffer
  const address = "0x" + Buffer.from(keccakAddress.slice(-20)).toString("hex")
  return getChecksumAddress(address)
}

function getChecksumAddress(address: string) {
  address = address.toLowerCase()

  const chars = address.substring(2).split("")
  const expanded = new Uint8Array(40)
  for (let i = 0; i < 40; i++) {
    expanded[i] = chars[i].charCodeAt(0)
  }

  const hashed = Array.from(keccak_256(expanded))

  for (let i = 0; i < 40; i += 2) {
    if ((hashed[i >> 1] >> 4) >= 8) {
      chars[i] = chars[i].toUpperCase()
    }
    if ((hashed[i >> 1] & 0x0f) >= 8) {
      chars[i + 1] = chars[i + 1].toUpperCase()
    }
  }

  return "0x" + chars.join("")
}
