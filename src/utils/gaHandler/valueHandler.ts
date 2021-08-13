import { getMetricValue } from "@gapit/grafana-metric";

export function valueHandler(
  metric: string,
  decimals: number,
  showcase: boolean
): string {
  if (metric) {
    const dataValue = getMetricValue(metric, {
      showcase,
      decimals,
    });
    if (typeof dataValue === "number") return dataValue.toFixed(decimals);
  }
  return "No data";
}
