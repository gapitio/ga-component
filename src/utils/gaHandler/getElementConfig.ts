import { queryGroupSelector, querySelector } from "../querySelector";
import type { EltConfig } from "./types";

export function getElementConfig(id: string): EltConfig {
  const groupElt = querySelector<SVGGElement>(`#${id}-breaker`);

  const clickElt = queryGroupSelector<SVGRectElement>(
    groupElt,
    `[id^="click"]`
  );

  const valueElt = queryGroupSelector<SVGTextElement>(
    groupElt,
    `[id^="breaker-text"] [id^="data"] > tspan`
  );

  const descriptionElt = queryGroupSelector<SVGTextElement>(
    groupElt,
    `[id^="breaker-text"] [id^="des"] [id^="amp"]`
  );

  const textElt = queryGroupSelector<SVGTextElement>(
    groupElt,
    `[id^="breaker-text"] [id^="des"] [id^="tag"]`
  ) as SVGTextElement & { defaultColor: string };

  const trippedElt = queryGroupSelector<SVGRectElement>(
    groupElt,
    `[id^="tripped"]`
  );

  const strokeGroup = queryGroupSelector<SVGGElement>(
    groupElt,
    `[id^="misc-stroke"]`
  );

  const fillGroup = queryGroupSelector<SVGGElement>(
    groupElt,
    `[id^="main-GA-breaker"] [id^="fill"]`
  );

  const activeBreaker = queryGroupSelector<SVGPathElement>(
    groupElt,
    `[id^="main-GA-breaker"] [id^="stroke"] [id^="open"]`
  );

  const inactiveBreaker = queryGroupSelector<SVGPathElement>(
    groupElt,
    `[id^="main-GA-breaker"] [id^="stroke"] [id^="closed"]`
  );

  return {
    clickElt,
    valueElt,
    descriptionElt,
    textElt,
    trippedElt,
    strokeGroup,
    fillGroup,
    activeBreaker,
    inactiveBreaker,
  };
}
