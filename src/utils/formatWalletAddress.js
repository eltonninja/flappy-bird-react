export function formatWalletAddress(address) {
  return address.slice(0, 10) + "..." + address.slice(address.length - 10);
}
