/// <reference types="cypress" />
import { createSeries } from "../mock/createSeries";
import { updateData } from "../mock/data";
import type { HTMLNode } from "../../types/htmlgraphicsTypes/htmlNode";
import customProperties from "../mock/customProperties.json";
import { getElementConfig } from "../../src/utils/gaHandler/getElementConfig";
import { gaHandler } from "../../src/utils/gaHandler/gaComponent";
import type { ComponentType } from "../../src/utils/gaHandler/types";
import { updateDescription } from "../../src/utils/gaHandler/updateDescription";

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

context("GA - vertical", () => {
  beforeEach(() => {
    cy.viewport(240, 240);
    cy.visit("index.html");
    cy.document().then((doc) => {
      [window.htmlNode] = (doc.getElementsByTagName("svg") as unknown) as [
        HTMLNode
      ];
    });
  });

  const { isShowcase, defaultColors, component } = customProperties;

  it("contains all elements with getElementConfig", () => {
    const { id, idSuffix } = component.vertical;
    const {
      groupElt,
      clickElt,
      valueElt,
      descriptionElt,
      textElt,
      trippedElt,
      strokeGroup,
      fillGroup,
      activeBreaker,
      inactiveBreaker,
    } = getElementConfig({ id, idSuffix });

    console.log(
      "groupElt: ",
      groupElt,
      "\n clickElt: ",
      clickElt,
      "\n valueElt: ",
      valueElt,
      "\n descriptionElt: ",
      descriptionElt,
      "\n textElt: ",
      textElt,
      "\n trippedElt: ",
      trippedElt,
      "\n strokeGroup: ",
      strokeGroup,
      "\n fillGroup: ",
      fillGroup,
      "\n activeBreaker: ",
      activeBreaker,
      "\n inactiveBreaker: ",
      inactiveBreaker
    );

    expect(groupElt).exist;
    expect(clickElt).exist;
    expect(valueElt).exist;
    expect(descriptionElt).exist;
    expect(textElt).exist;
    expect(trippedElt).exist;
    expect(strokeGroup).exist;
    expect(fillGroup).exist;
    expect(activeBreaker).exist;
    expect(inactiveBreaker).exist;
  });

  it("check inactive component state", () => {
    const component: { vertical: ComponentType } = {
      vertical: {
        id: "vertical",
        idSuffix: "-breaker",
        metric: "vertical",
        metricVar: {
          breakerMetric: "-breaker",
          valueMetric: "-data",
          trippedMetric: "-tripped",
        },
        isActive: false,
        link: "asd",
        invertTripped: false,
        invertBreaker: false,
        baseUnit: "kW",
        decimals: 1,
        descriptionText: "2000A",
      },
    };

    gaHandler({
      component: component.vertical,
      defaultColors,
      showcase: isShowcase,
    });

    cy.get("#tripped-90").should("have.css", "opacity", "0");
    cy.get("#tag").should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#amp").should("have.css", "fill", "rgb(159, 159, 159)");
    cy.get("#data")
      .children("tspan")
      .should("have.css", "fill", "rgb(159, 159, 159)");
    cy.get("#data").children("tspan").should("have.text", "Inactive");
    cy.get("#misc-stroke")
      .children()
      .should("have.css", "stroke", "rgb(159, 159, 159)");
    cy.get("#fill").children().should("have.css", "fill", "rgb(159, 159, 159)");
    cy.get("#stroke")
      .children()
      .should("have.css", "stroke", "rgb(159, 159, 159)");
  });

  it("check all metric values = 1", () => {
    const { metric, metricVar } = component.vertical;

    createMetricSeries([
      { metric: metric + metricVar.breakerMetric, value: 1 },
      { metric: metric + metricVar.trippedMetric, value: 1 },
      { metric: metric + metricVar.valueMetric, value: 1 },
    ]);

    gaHandler({
      component: component.vertical,
      defaultColors,
      showcase: isShowcase,
    });

    cy.get("#tripped-90").should("have.css", "opacity", "1");
    cy.get("#tripped-90").should("have.css", "fill", "rgb(175, 35, 65)");
    cy.get("#tag").should("have.css", "fill", "rgb(255, 255, 255)");
    cy.get("#amp").should("have.css", "fill", "rgb(255, 255, 255)");
    cy.get("#data")
      .children("tspan")
      .should("have.css", "fill", "rgb(255, 255, 255)");
    cy.get("#data").children("tspan").should("have.text", "1.0 kW");
    cy.get("#misc-stroke")
      .children()
      .should("have.css", "stroke", "rgb(255, 255, 255)");
    cy.get("#fill").children().should("have.css", "fill", "rgb(255, 255, 255)");
    cy.get("#stroke")
      .children()
      .should("have.css", "stroke", "rgb(255, 255, 255)");
    cy.get("#open").should("have.css", "display", "inline");
    cy.get("#closed").should("have.css", "display", "none");
  });

  it("check all metric values = 0", () => {
    const { metric, metricVar } = component.vertical;

    createMetricSeries([
      { metric: metric + metricVar.breakerMetric, value: 0 },
      { metric: metric + metricVar.trippedMetric, value: 0 },
      { metric: metric + metricVar.valueMetric, value: 0 },
    ]);

    gaHandler({
      component: component.vertical,
      defaultColors,
      showcase: isShowcase,
    });

    cy.get("#tripped-90").should("have.css", "opacity", "0");
    cy.get("#tag").should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#amp").should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#data")
      .children("tspan")
      .should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#data").children("tspan").should("have.text", "0.0 kW");
    cy.get("#misc-stroke")
      .children()
      .should("have.css", "stroke", "rgb(39, 39, 41)");
    cy.get("#fill").children().should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#stroke")
      .children()
      .should("have.css", "stroke", "rgb(39, 39, 41)");
    cy.get("#open").should("have.css", "display", "none");
    cy.get("#closed").should("have.css", "display", "inline");
  });

  it("check all metric values = 2", () => {
    const { metric, metricVar } = component.vertical;

    createMetricSeries([
      { metric: metric + metricVar.breakerMetric, value: 2 },
      { metric: metric + metricVar.trippedMetric, value: 2 },
      { metric: metric + metricVar.valueMetric, value: 2 },
    ]);

    gaHandler({
      component: component.vertical,
      defaultColors,
      showcase: isShowcase,
    });

    cy.get("#tripped-90").should("have.css", "opacity", "1");
    cy.get("#tripped-90").should("have.css", "fill", "rgb(255, 205, 0)");
    cy.get("#tag").should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#amp").should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#data")
      .children("tspan")
      .should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#data").children("tspan").should("have.text", "2.0 kW");
    cy.get("#misc-stroke")
      .children()
      .should("have.css", "stroke", "rgb(39, 39, 41)");
    cy.get("#fill").children().should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#stroke")
      .children()
      .should("have.css", "stroke", "rgb(39, 39, 41)");
    cy.get("#open").should("have.css", "display", "inline");
    cy.get("#closed").should("have.css", "display", "inline");
  });

  it("check if value if no valueMetric", () => {
    const component: { vertical: ComponentType } = {
      vertical: {
        id: "vertical",
        idSuffix: "-breaker",
        metric: "vertical",
        metricVar: {
          breakerMetric: "-breaker",
          valueMetric: "",
          trippedMetric: "-tripped",
        },
        isActive: true,
        link: "asd",
        invertTripped: false,
        invertBreaker: false,
        baseUnit: "kW",
        decimals: 1,
        descriptionText: "2000A",
      },
    };

    createMetricSeries([
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.breakerMetric,
        value: 2,
      },
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.trippedMetric,
        value: 2,
      },
    ]);

    gaHandler({
      component: component.vertical,
      defaultColors,
      showcase: isShowcase,
    });

    cy.get("#tripped-90").should("have.css", "opacity", "1");
    cy.get("#tripped-90").should("have.css", "fill", "rgb(255, 205, 0)");
    cy.get("#tag").should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#amp").should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#data").children("tspan").should("have.css", "display", "none");
    cy.get("#misc-stroke")
      .children()
      .should("have.css", "stroke", "rgb(39, 39, 41)");
    cy.get("#fill").children().should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#stroke")
      .children()
      .should("have.css", "stroke", "rgb(39, 39, 41)");
    cy.get("#open").should("have.css", "display", "inline");
    cy.get("#closed").should("have.css", "display", "inline");
  });

  it("check if tripped if no trippedMetric", () => {
    const component: { vertical: ComponentType } = {
      vertical: {
        id: "vertical",
        idSuffix: "-breaker",
        metric: "vertical",
        metricVar: {
          breakerMetric: "-breaker",
          valueMetric: "-data",
          trippedMetric: "",
        },
        isActive: true,
        link: "asd",
        invertTripped: false,
        invertBreaker: false,
        baseUnit: "kW",
        decimals: 1,
        descriptionText: "2000A",
      },
    };

    createMetricSeries([
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.breakerMetric,
        value: 1,
      },
      {
        metric:
          component.vertical.metric + component.vertical.metricVar.valueMetric,
        value: 2,
      },
    ]);

    gaHandler({
      component: component.vertical,
      defaultColors,
      showcase: isShowcase,
    });

    cy.get("#tripped-90").should("have.css", "opacity", "0");
    cy.get("#tag").should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#amp").should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#data").children("tspan").should("have.text", "2.0 kW");
    cy.get("#data")
      .children("tspan")
      .should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#misc-stroke")
      .children()
      .should("have.css", "stroke", "rgb(39, 39, 41)");
    cy.get("#fill").children().should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#stroke")
      .children()
      .should("have.css", "stroke", "rgb(39, 39, 41)");
    cy.get("#open").should("have.css", "display", "inline");
    cy.get("#closed").should("have.css", "display", "none");
  });

  it("check breaker if no breakerMetric", () => {
    const component: { vertical: ComponentType } = {
      vertical: {
        id: "vertical",
        idSuffix: "-breaker",
        metric: "vertical",
        metricVar: {
          breakerMetric: "-breaker",
          valueMetric: "-data",
          trippedMetric: "",
        },
        isActive: true,
        link: "asd",
        invertTripped: false,
        invertBreaker: false,
        baseUnit: "kW",
        decimals: 1,
        descriptionText: "2000A",
      },
    };

    createMetricSeries([
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.trippedMetric,
        value: 1,
      },
      {
        metric:
          component.vertical.metric + component.vertical.metricVar.valueMetric,
        value: 2,
      },
    ]);

    gaHandler({
      component: component.vertical,
      defaultColors,
      showcase: isShowcase,
    });

    cy.get("#tripped-90").should("have.css", "opacity", "0");
    cy.get("#tag").should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#amp").should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#data").children("tspan").should("have.text", "2.0 kW");
    cy.get("#data")
      .children("tspan")
      .should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#misc-stroke")
      .children()
      .should("have.css", "stroke", "rgb(39, 39, 41)");
    cy.get("#fill").children().should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#stroke")
      .children()
      .should("have.css", "stroke", "rgb(39, 39, 41)");
    cy.get("#open").should("have.css", "display", "inline");
    cy.get("#closed").should("have.css", "display", "inline");
  });

  it("check if invertedBreaker & invertedBreaker changes correctly, value = 0", () => {
    const component: { vertical: ComponentType } = {
      vertical: {
        id: "vertical",
        idSuffix: "-breaker",
        metric: "vertical",
        metricVar: {
          breakerMetric: "-breaker",
          valueMetric: "-data",
          trippedMetric: "-tripped",
        },
        isActive: true,
        link: "asd",
        invertTripped: true,
        invertBreaker: true,
        baseUnit: "kW",
        decimals: 1,
        descriptionText: "2000A",
      },
    };

    createMetricSeries([
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.trippedMetric,
        value: 0,
      },
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.breakerMetric,
        value: 0,
      },
      {
        metric:
          component.vertical.metric + component.vertical.metricVar.valueMetric,
        value: 2,
      },
    ]);

    gaHandler({
      component: component.vertical,
      defaultColors,
      showcase: isShowcase,
    });

    cy.get("#tripped-90").should("have.css", "opacity", "1");
    cy.get("#tripped-90").should("have.css", "fill", "rgb(175, 35, 65)");
    cy.get("#tag").should("have.css", "fill", "rgb(255, 255, 255)");
    cy.get("#amp").should("have.css", "fill", "rgb(255, 255, 255)");
    cy.get("#data").children("tspan").should("have.text", "2.0 kW");
    cy.get("#data")
      .children("tspan")
      .should("have.css", "fill", "rgb(255, 255, 255)");
    cy.get("#misc-stroke")
      .children()
      .should("have.css", "stroke", "rgb(255, 255, 255)");
    cy.get("#fill").children().should("have.css", "fill", "rgb(255, 255, 255)");
    cy.get("#stroke")
      .children()
      .should("have.css", "stroke", "rgb(255, 255, 255)");
    cy.get("#open").should("have.css", "display", "inline");
    cy.get("#closed").should("have.css", "display", "none");
  });

  it("check if invertedBreaker & invertedBreaker changes correctly, value = 1", () => {
    const component: { vertical: ComponentType } = {
      vertical: {
        id: "vertical",
        idSuffix: "-breaker",
        metric: "vertical",
        metricVar: {
          breakerMetric: "-breaker",
          valueMetric: "-data",
          trippedMetric: "-tripped",
        },
        isActive: true,
        link: "asd",
        invertTripped: true,
        invertBreaker: true,
        baseUnit: "kW",
        decimals: 1,
        descriptionText: "2000A",
      },
    };

    createMetricSeries([
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.trippedMetric,
        value: 1,
      },
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.breakerMetric,
        value: 1,
      },
      {
        metric:
          component.vertical.metric + component.vertical.metricVar.valueMetric,
        value: 2,
      },
    ]);

    gaHandler({
      component: component.vertical,
      defaultColors,
      showcase: isShowcase,
    });

    cy.get("#tripped-90").should("have.css", "opacity", "0");
    cy.get("#tag").should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#amp").should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#data").children("tspan").should("have.text", "2.0 kW");
    cy.get("#data")
      .children("tspan")
      .should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#misc-stroke")
      .children()
      .should("have.css", "stroke", "rgb(39, 39, 41)");
    cy.get("#fill").children().should("have.css", "fill", "rgb(39, 39, 41)");
    cy.get("#stroke")
      .children()
      .should("have.css", "stroke", "rgb(39, 39, 41)");
    cy.get("#open").should("have.css", "display", "none");
    cy.get("#closed").should("have.css", "display", "inline");
  });

  it("check if baseUnit changes correctly", () => {
    const component: { vertical: ComponentType } = {
      vertical: {
        id: "vertical",
        idSuffix: "-breaker",
        metric: "vertical",
        metricVar: {
          breakerMetric: "-breaker",
          valueMetric: "-data",
          trippedMetric: "-tripped",
        },
        isActive: true,
        link: "asd",
        invertTripped: true,
        invertBreaker: true,
        baseUnit: "test",
        decimals: 1,
        descriptionText: "2000A",
      },
    };

    createMetricSeries([
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.trippedMetric,
        value: 1,
      },
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.breakerMetric,
        value: 1,
      },
      {
        metric:
          component.vertical.metric + component.vertical.metricVar.valueMetric,
        value: 2,
      },
    ]);

    gaHandler({
      component: component.vertical,
      defaultColors,
      showcase: isShowcase,
    });

    cy.get("#data").children("tspan").should("have.text", "2.0 test");
  });

  it("check if decimals changes correctly", () => {
    const component: { vertical: ComponentType } = {
      vertical: {
        id: "vertical",
        idSuffix: "-breaker",
        metric: "vertical",
        metricVar: {
          breakerMetric: "-breaker",
          valueMetric: "-data",
          trippedMetric: "-tripped",
        },
        isActive: true,
        link: "asd",
        invertTripped: true,
        invertBreaker: true,
        baseUnit: "kW",
        decimals: 2,
        descriptionText: "2000A",
      },
    };

    createMetricSeries([
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.trippedMetric,
        value: 1,
      },
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.breakerMetric,
        value: 1,
      },
      {
        metric:
          component.vertical.metric + component.vertical.metricVar.valueMetric,
        value: 2,
      },
    ]);

    gaHandler({
      component: component.vertical,
      defaultColors,
      showcase: isShowcase,
    });

    cy.get("#data").children("tspan").should("have.text", "2.00 kW");
  });

  it("check if description text changes correctly", () => {
    const component: { vertical: ComponentType } = {
      vertical: {
        id: "vertical",
        idSuffix: "-breaker",
        metric: "vertical",
        metricVar: {
          breakerMetric: "-breaker",
          valueMetric: "-data",
          trippedMetric: "-tripped",
        },
        isActive: true,
        link: "asd",
        invertTripped: true,
        invertBreaker: true,
        baseUnit: "kW",
        decimals: 2,
        descriptionText: "2000A",
      },
    };

    createMetricSeries([
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.trippedMetric,
        value: 1,
      },
      {
        metric:
          component.vertical.metric +
          component.vertical.metricVar.breakerMetric,
        value: 1,
      },
      {
        metric:
          component.vertical.metric + component.vertical.metricVar.valueMetric,
        value: 2,
      },
    ]);

    const { descriptionElt } = getElementConfig({
      id: component.vertical.id,
      idSuffix: component.vertical.idSuffix,
    });

    updateDescription(descriptionElt, component.vertical.descriptionText);

    gaHandler({
      component: component.vertical,
      defaultColors,
      showcase: isShowcase,
    });

    cy.get("#amp")
      .children("tspan")
      .should("have.text", ` - ${component.vertical.descriptionText}`);
  });
});
