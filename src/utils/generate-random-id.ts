export function generateRandomId(length: number = 5) {
  //TODO: move this to constant file
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let randomId = '';
  while (randomId.length < length) {
    const randomCharactersIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomCharactersIndex);
  }

  return randomId;
}
