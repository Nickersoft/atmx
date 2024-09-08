/**
 * Deselects the current browser selection and returns function that restores selection.
 *
 * @example
 * const restore = toggleSelection(); // Store the user's selection and deselect it
 * restore(); // Restore focus to the user's selection
 */
export function deselect() {
  let selection = document.getSelection();

  if (!selection?.rangeCount) {
    return function () {};
  }

  let active = document.activeElement;

  let ranges = [];

  for (let i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (
    active?.tagName.toUpperCase() // .toUpperCase() handles XHTML
  ) {
    case "INPUT":
    case "TEXTAREA":
      (active as HTMLInputElement).blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();

  return function () {
    selection.type === "Caret" && selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function (range) {
        selection.addRange(range);
      });
    }

    active && (active as HTMLInputElement).focus();
  };
}
