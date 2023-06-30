export function generateRoomCode(length: number) {
  const code: number[] = [];
  for (let i = 0; i < length; i++) {
    let random;

    do {
      random = Math.floor(Math.random() * 10);
    } while (code.includes(random));

    code.push(random);
  }

  return code.join("");
}
