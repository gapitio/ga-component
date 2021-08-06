/// <reference types="cypress" />
import { createSeries } from "../mock/createSeries";
import { updateData } from "../mock/data";
import type { HTMLNode } from "../../types/htmlgraphicsTypes/htmlNode";
import customProperties from "../mock/customProperties.json";

function createMetricSeries(
  series: Array<{ metric: string; value: number | null }>
) {
  const seriesArray = series.map(({ metric, value }) => {
    return createSeries(metric, value);
  });
  updateData(seriesArray);
}

window.theme = {
  isDark: false,
  isLight: true,
};

context("GA - breaker component", () => {
  beforeEach(() => {
    cy.viewport(216, 216);
    cy.visit("index.html");
    cy.document().then((doc) => {
      [window.htmlNode] = (doc.getElementsByTagName("svg") as unknown) as [
        HTMLNode
      ];
    });
  });

  const { isShowcase, rackStates, component } = customProperties;
});
