export function formatWalletAddress(address) {
  return address.slice(0, 16) + "..." + address.slice(address.length - 4);
}
