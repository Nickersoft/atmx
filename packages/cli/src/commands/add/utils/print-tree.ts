type Item<Label extends string, Children extends string> = {
  [V in Label]: string;
} & { [U in Children]?: Item<Label, Children>[] };

interface ParentItem {
  last: boolean;
}

type ExtendedItem<Label extends string, Children extends string> = Item<
  Label,
  Children
> & {
  last: boolean;
  parents: ParentItem[];
};

interface TreeOptions<Label extends string, Children extends string> {
  label: Label;
  children: Children;
  rootLabel?: string;
}

class ConsoleTree<Label extends string, Children extends string> {
  constructor(
    private data: Item<Label, Children>[],
    private options: TreeOptions<Label, Children & string>,
  ) {}

  print() {
    console.log(this.toString());
  }

  toString() {
    return this.getArrayTree().join("\n");
  }

  private getArrayTree() {
    this.extendTreeData(this.data);
    return this.drawTree(this.data);
  }

  /**
   * Extends the tree data array with additional properties.
   * @param arr
   * @param parentData
   */
  private extendTreeData(
    arr: Item<Label, Children>[],
    parentData?: ExtendedItem<Label, Children>,
  ) {
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i] as ExtendedItem<Label, Children>;

      if (parentData?.parents) {
        const parents = JSON.parse(JSON.stringify(parentData.parents));
        parents.push({ last: parentData.last });
        item.parents = parents;
      } else {
        item.parents = [];
      }

      if (item[this.options.children] && item[this.options.children].length) {
        this.extendTreeData(item[this.options.children], item);
      }
    }
  }

  private drawTree(
    treeData: Item<Label, Children>[],
    renderData: string[] = [],
  ) {
    if (!renderData.length && treeData.length) {
      renderData.push(this.options.rootLabel ?? "");
    }

    for (var i = 0; i < treeData.length; i++) {
      const item = treeData[i] as ExtendedItem<Label, Children>;
      const blankIndent = "    ";
      const lineIndent = "│   ";

      let row = "";

      for (var j = 0; j < item.parents.length; j++) {
        const pItem = item.parents[j];

        if (pItem.last) {
          row += blankIndent;
        } else {
          row += lineIndent;
        }
      }

      const endLabel = (item.last ? "└── " : "├── ") + item[this.options.label];

      row += endLabel;
      renderData.push(row);

      if (item[this.options.children] && item[this.options.children].length) {
        this.drawTree(item[this.options.children], renderData);
      }
    }

    return renderData;
  }
}

export function printTree<
  Label extends string = "name",
  Children extends string = "children",
>(data: Item<Label, Children>[], options: TreeOptions<Label, Children>) {
  const tree = new ConsoleTree(data, options);
  tree.print();
}
