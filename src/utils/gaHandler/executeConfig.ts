import type {
  FuseResults,
  TrippedResults,
  ConfigInterface,
  EltConfig,
} from "./types";
import { updateBreakerColor } from "./updateBreakerColor";

export function executeConfig(
  fuseConfig: FuseResults,
  trippedConfig: TrippedResults,
  eltConfig: EltConfig,
  { descriptionText, value, baseUnit, metricVar }: ConfigInterface
): void {
  const {
    textElt,
    valueElt,
    descriptionElt,
    trippedElt,
    strokeGroup,
    fillGroup,
    activeBreaker,
    inactiveBreaker,
  } = eltConfig;

  const { trippedOpacity, textColor, trippedColor, valueColor, breakerColor } =
    trippedConfig;

  const { active, inactive } = fuseConfig;

  textElt.style.fill = textColor;
  textElt.defaultColor = textColor;

  textElt.defaultColor = textColor;
  textElt.dataset.defaultColor = textColor;

  if (metricVar.valueMetric) {
    valueElt.style.fill = valueColor;
    valueElt.style.display = "inline";
    valueElt.textContent =
      value && value !== "No data" ? `${value} ${baseUnit}` : "No data";
  } else {
    valueElt.style.display = "none";
  }

  if (descriptionText) {
    descriptionElt.style.fill = textColor;
  }

  trippedElt.style.opacity = trippedOpacity;
  trippedElt.style.fill = trippedColor;

  activeBreaker.style.display = active;
  inactiveBreaker.style.display = inactive;
  updateBreakerColor({
    breakerColor,
    activeBreaker,
    inactiveBreaker,
    strokeGroup,
    fillGroup,
  });
}
