import { randomBytes, createHash } from "crypto";

function generateRandomHash(length: number): string {
  const randomBytesBuffer = randomBytes(length);
  const hash = createHash("sha256").update(randomBytesBuffer).digest("hex");
  return hash;
}

export default generateRandomHash;
