import { queryGroupPosition } from "../querySelector";

export function updateDescription(
  descriptionElt: SVGTextElement,
  descriptionText: string
): void {
  const descriptionTspan = queryGroupPosition(descriptionElt, 0);

  if (descriptionText)
    descriptionTspan.textContent = descriptionTspan.textContent?.includes("-")
      ? ` - ${descriptionText}`
      : descriptionText;
}
