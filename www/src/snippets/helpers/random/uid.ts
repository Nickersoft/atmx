import { iterate } from "@/snippets/helpers/array/iterate";
import { random } from "@/snippets/helpers/random/random";

/**
 * Generate a random string of a given length.
 *
 * @example
 * uid(8) // => "a3fSDf32"
 */
export function uid(length: number, specials = ""): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" + specials;
  return iterate(
    length,
    (acc) => {
      return acc + characters.charAt(random(0, characters.length - 1));
    },
    "",
  );
}
