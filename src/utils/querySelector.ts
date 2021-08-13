function querySelector<E extends Element>(selectors: string): E {
  const element = htmlNode.querySelector<E>(selectors);
  if (element) return element;

  throw new Error(`Could not find element with the selectors: ${selectors}`);
}

function querySelectorUnsafe<E extends Element>(selectors: string): E | null {
  const element = htmlNode.querySelector<E>(selectors);
  return element;
}

function queryGroupPosition<E extends Element>(
  groupElement: SVGGElement,
  position: number
): E {
  const element = groupElement.children.item(position) as E | undefined;
  if (element) return element;

  throw new Error(
    `Couldn't find element in ${groupElement.id} at position ${position}`
  );
}

function queryGroupSelector<E extends Element>(
  groupElement: SVGGElement,
  selector: string
): E {
  const element = groupElement.querySelector<E>(selector) as E | undefined;
  if (element) return element;

  throw new Error(
    `Couldn't find element in ${groupElement.id} with ${selector}`
  );
}

function queryGroupPositionById<E extends Element>(
  selector: string,
  position: number
): E {
  const groupElement = querySelector<SVGGElement>(selector);
  const element = queryGroupPosition<E>(groupElement, position);
  if (element) return element;

  throw new Error(
    `Couldn't find element in ${selector} at position ${position}`
  );
}

function queryGroupPositionUnsafe<E extends Element>(
  groupElement: SVGGElement,
  position: number
): E | undefined {
  return groupElement.children.item(position) as E | undefined;
}

export {
  querySelector,
  querySelectorUnsafe,
  queryGroupSelector,
  queryGroupPosition,
  queryGroupPositionById,
  queryGroupPositionUnsafe,
};
