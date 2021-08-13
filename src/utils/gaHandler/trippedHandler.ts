import { getMetricValue } from "@gapit/grafana-metric";
import type { Colors, TrippedResults } from "./types";

export function trippedHandler(
  metric: string,
  invertTripped: boolean,
  showcase: boolean,
  colors: Colors
): TrippedResults {
  const trippedValue = getMetricValue(metric, {
    showcase,
    range: { min: 0, max: 2 },
    decimals: 0,
  });
  const { darkTheme, lightTheme, tripped, missingCom } = colors.active;
  if (metric) {
    const active = +!invertTripped;
    const inactive = +invertTripped;
    switch (
      typeof trippedValue === "number" ? Math.round(trippedValue) : undefined
    ) {
      case active:
        return {
          trippedDisplay: "inline",
          textColor: darkTheme,
          trippedColor: tripped,
          valueColor: darkTheme,
          breakerColor: darkTheme,
        };
      case inactive:
        return {
          trippedDisplay: "none",
          textColor: theme.isDark ? darkTheme : lightTheme,
          trippedColor: tripped,
          valueColor: theme.isDark ? darkTheme : lightTheme,
          breakerColor: theme.isDark ? darkTheme : lightTheme,
        };
      default:
        return {
          trippedDisplay: "inline",
          textColor: lightTheme,
          trippedColor: missingCom,
          valueColor: lightTheme,
          breakerColor: lightTheme,
        };
    }
  }
  return {
    trippedDisplay: "none",
    textColor: theme.isDark ? darkTheme : lightTheme,
    trippedColor: missingCom,
    valueColor: theme.isDark ? darkTheme : lightTheme,
    breakerColor: theme.isDark ? darkTheme : lightTheme,
  };
}
