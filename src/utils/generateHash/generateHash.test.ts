import generateHash from "./generateHash";

describe("generateHash", () => {
  test("generates a hash of the correct length", () => {
    const sha256HashLength = 64;

    const hash = generateHash(sha256HashLength);

    expect(hash.length).toBe(sha256HashLength);
  });

  test("generates different hashes for different calls", () => {
    const hashLength = 64;

    const hash1 = generateHash(hashLength);
    const hash2 = generateHash(hashLength);

    expect(hash1).not.toBe(hash2);
  });
});
