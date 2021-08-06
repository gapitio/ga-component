import { getMetricValue } from "@gapit/grafana-metric";
import type { FuseResults } from "./types";

export function fuseHandler(
  metric: string,
  invertBreaker: boolean,
  showcase: boolean
): FuseResults {
  if (metric) {
    const fuseValue = getMetricValue(metric, {
      showcase,
      range: { min: 0, max: 2 },
      decimals: 0,
    });

    const active = +!invertBreaker;
    const inactive = +invertBreaker;
    switch (typeof fuseValue === "number" ? Math.round(fuseValue) : undefined) {
      case inactive:
        return { active: "none", inactive: "inline" };
      case active:
        return { active: "inline", inactive: "none" };
      default:
        return { active: "inline", inactive: "inline" };
    }
  }
  return { active: "inline", inactive: "inline" };
}
