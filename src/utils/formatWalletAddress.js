export function formatWalletAddress(address) {
  try {
    return address.slice(0, 10) + "..." + address.slice(address.length - 10);
  } catch (e) {
    return "";
  }
}
