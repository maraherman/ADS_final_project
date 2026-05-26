export function buildLPS(pattern: string): number[] {
  const lps = new Array(pattern.length).fill(0);

  let length = 0;
  let i = 1;

  while (i < pattern.length) {
    if (pattern[i] === pattern[length]) {
      length++;

      lps[i] = length;

      i++;
    }

    else {
      if (length !== 0) {
        length = lps[length - 1];
      }

      else {
        lps[i] = 0;

        i++;
      }
    }
  }

  return lps;
}
export function kmpSearch(
  text: string,
  pattern: string
): boolean {

  const lps = buildLPS(pattern);

  let i = 0;
  let j = 0;

  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    }

    if (j === pattern.length) {
      return true;
    }

    else if (
      i < text.length &&
      text[i] !== pattern[j]
    ) {
      if (j !== 0) {
        j = lps[j - 1];
      }

      else {
        i++;
      }
    }
  }

  return false;
}