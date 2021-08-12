export interface ConfigInterface {
  descriptionText: string;
  value: string | undefined;
  baseUnit: string;
  metricVar: MetricVar;
}

export interface FuseResults {
  active: string;
  inactive: string;
}

export interface TrippedResults {
  trippedOpacity: string;
  textColor: string;
  trippedColor: string;
  valueColor: string;
  breakerColor: string;
}

export interface MetricVar {
  breakerMetric: string;
  valueMetric: string;
  trippedMetric: string;
}

export interface ElementInterface {
  isActive: boolean;
  descriptionText: string;
  metricVar: MetricVar;
  eltConfig: EltConfig;
  defaultColors: Colors;
}

export interface EltConfig {
  groupElt: SVGGElement;
  clickElt: SVGRectElement;
  valueElt: SVGTSpanElement;
  descriptionElt: SVGTextElement;
  textElt: SVGTextElement & { defaultColor: string };
  trippedElt: SVGRectElement;
  strokeGroup: SVGGElement;
  fillGroup: SVGGElement;
  activeBreaker: SVGPathElement;
  inactiveBreaker: SVGPathElement;
}

export interface Colors {
  active: {
    lightTheme: string;
    darkTheme: string;
    tripped: string;
    missingCom: string;
  };
  inactive: {
    lightTheme: string;
    darkTheme: string;
  };
}

export interface ComponentType {
  id: string;
  idSuffix: string;
  metric: string;
  metricVar: {
    breakerMetric: string;
    valueMetric: string;
    trippedMetric: string;
  };
  isActive: boolean;
  link: string;
  invertTripped: boolean;
  invertBreaker: boolean;
  baseUnit: string;
  decimals: number;
  descriptionText: string;
}
