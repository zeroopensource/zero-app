import { format } from "date-fns";
import { customAlphabet } from "nanoid";

const DEFAULT_PART_COUNT = 4;
const DEFAULT_PART_SIZE = 6;
const DEFAULT_SEPARATOR = "-";
const DEFAULT_PREFIXES = ["zero", format(new Date(), "yyyyMMdd")];

interface Params {
  prefixes?: string[] | null | undefined;
  /** x-x-x-x-x-x */
  partSize?: number | null | undefined;
  /** xxxxxxx */
  partCount?: number | null | undefined;
  separator?: string | null | undefined;
}

export const generateZeroId = (params?: Params | undefined) => {
  const { prefixes, partSize, partCount, separator } = params || {};
  const keys = Array.from({ length: partCount || DEFAULT_PART_COUNT }, () =>
    customAlphabet("1234567890abcdef", partSize || DEFAULT_PART_SIZE)()
  );

  return [...(prefixes || DEFAULT_PREFIXES), ...keys].join(
    separator || DEFAULT_SEPARATOR
  );
};
