import type { PanelData } from "@grafana/data";

import type { HTMLNode } from "./htmlgraphicsTypes/htmlNode";
import type { GrafanaTheme } from "./htmlgraphicsTypes/theme";

declare global {
  /**
   * The HTML node from the HTML/SVG code.
   *
   * It's a shadow root https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM.
   */
  const htmlNode: HTMLNode;

  /**
   * Result set of panel queries
   * https://grafana.com/docs/grafana/latest/packages_api/data/paneldata/.
   */
  const data: PanelData;

  /**
   * Grafana theme.
   * Here you can get the current theme, colors, sizes, ETC.
   *
   * https://grafana.com/docs/grafana/latest/packages_api/data/grafanatheme/
   */
  const theme: GrafanaTheme;

  interface Window {
    htmlNode: typeof htmlNode;
    data: typeof data;
    theme: typeof theme;
  }
}
