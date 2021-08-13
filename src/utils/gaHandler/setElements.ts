import type { ElementInterface } from "./types";
import { updateBreakerColor } from "./updateBreakerColor";

export function setElements({
  isActive,
  descriptionText,
  metricVar,
  eltConfig,
  defaultColors,
}: ElementInterface): void {
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

  const { active, inactive } = defaultColors;
  const defaults = isActive ? active : inactive;
  const color = theme.isDark ? defaults.darkTheme : defaults.lightTheme;

  textElt.style.fill = theme.isDark ? active.darkTheme : active.lightTheme;

  if (metricVar.valueMetric) {
    valueElt.style.fill = color;
    valueElt.textContent = isActive ? "No data" : "Inactive";
  } else valueElt.style.display = "none";

  if (descriptionText) {
    descriptionElt.style.fill = color;
  } else descriptionElt.style.display = "none";

  if (metricVar.trippedMetric) {
    trippedElt.style.display = "none";
  }

  activeBreaker.style.display = "inline";
  inactiveBreaker.style.display = "inline";
  updateBreakerColor({
    breakerColor: color,
    activeBreaker,
    inactiveBreaker,
    strokeGroup,
    fillGroup,
  });
}
