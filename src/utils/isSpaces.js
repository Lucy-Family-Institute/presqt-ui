export default function isSpaces(text) {
  const userText = text.replace(/^\s+/, '').replace(/\s+$/, '');
  return userText === '';
}