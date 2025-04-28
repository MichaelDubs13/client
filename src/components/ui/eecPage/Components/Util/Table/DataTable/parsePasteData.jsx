export function parsePasteData(clipboardData) {
    return clipboardData
      .trim()
      .replace(/\r\n?/g, "\n")
      .split("\n")
      .map((row) => (row.length === 0 ? [""] : row.split("\t")));
}
  