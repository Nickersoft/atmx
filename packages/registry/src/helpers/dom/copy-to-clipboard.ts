import { deselect } from "./deselect.js";

/**
 * Fallback to copy text to clipboard.
 * @param text - The text to copy to the clipboard.
 */
function fallback(text: string) {
  return new Promise<void>((resolve, reject) => {
    let mark, selection, reselect, range;

    try {
      reselect = deselect();
      range = document.createRange();
      selection = document.getSelection();
      mark = document.createElement("span");

      mark.textContent = text;

      // avoid screen readers from reading out loud the text
      mark.ariaHidden = "true";

      // reset user styles for span element
      mark.style.all = "unset";

      // prevents scrolling to the end of the page
      mark.style.position = "fixed";
      mark.style.top = "0";
      mark.style.clipPath = "rect(0, 0, 0, 0)";

      // used to preserve spaces and line breaks
      mark.style.whiteSpace = "pre";

      // do not inherit user-select (it may be `none`)
      mark.style.userSelect = "text";

      // resolves the promise when the copy event is completed
      mark.addEventListener("copy", function (e) {
        resolve();
      });

      document.body.appendChild(mark);
      range.selectNodeContents(mark);
      selection?.addRange(range);

      var successful = document.execCommand("copy");

      if (!successful) {
        reject(new Error("copy command was unsuccessful"));
      }
    } catch (e) {
      reject(e);
    } finally {
      if (selection) {
        if (range && typeof selection.removeRange == "function") {
          selection.removeRange(range);
        } else {
          selection.removeAllRanges();
        }
      }

      if (mark) {
        document.body.removeChild(mark);
      }

      reselect?.();
    }
  });
}

/**
 * Copies the given value to the clipboard using the Navigator API.
 * If it does not exist, it falls back to using a textarea element as a workaround.
 *
 * @param value - The value to copy to the clipboard.
 *
 * @example
 * await copyToClipboard("Hello, world!");
 */
export async function copyToClipboard(value: string) {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
    } else {
      throw new Error("writeText not supported");
    }
  } catch (e) {
    await fallback(value);
  }
}
