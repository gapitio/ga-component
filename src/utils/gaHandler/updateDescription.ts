import { queryGroupPosition } from "../querySelector";

export function updateDescription(
  descriptionElt: SVGTextElement,
  descriptionText: string
): void {
  if (descriptionText) {
    const descriptionTspan = queryGroupPosition(descriptionElt, 0);
    descriptionTspan.textContent =
      descriptionTspan.textContent?.slice(0, 3) === " - "
        ? ` - ${descriptionText}`
        : descriptionText;
  }
}
