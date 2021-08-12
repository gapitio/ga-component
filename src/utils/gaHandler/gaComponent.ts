import { fuseHandler } from "./fuseHandler";
import { getElementConfig } from "./getElementConfig";
import { trippedHandler } from "./trippedHandler";
import { executeConfig } from "./executeConfig";
import { setElements } from "./setElements";
import { valueHandler } from "./valueHandler";
import type { Colors, ComponentType } from "./types";

export function gaHandler({
  component,
  defaultColors,
  showcase,
}: {
  component: ComponentType;
  defaultColors: Colors;
  showcase: boolean;
}): void {
  const {
    id,
    idSuffix,
    metric,
    metricVar,
    isActive,
    descriptionText,
    invertTripped,
    invertBreaker,
    decimals,
    baseUnit,
  } = component;
  const eltConfig = getElementConfig({ id, idSuffix });

  setElements({
    isActive,
    descriptionText,
    metricVar,
    eltConfig,
    defaultColors,
  });
  if (isActive) {
    const value = valueHandler(
      metricVar.valueMetric ? metric + metricVar.valueMetric : "",
      decimals,
      showcase
    );
    const fuseConfig = fuseHandler(
      metricVar.breakerMetric ? metric + metricVar.breakerMetric : "",
      invertBreaker,
      showcase
    );
    const trippedConfig = trippedHandler(
      metricVar.trippedMetric ? metric + metricVar.trippedMetric : "",
      invertTripped,
      showcase,
      defaultColors
    );
    executeConfig(fuseConfig, trippedConfig, eltConfig, {
      descriptionText,
      value,
      baseUnit,
      metricVar,
    });
  }
}
