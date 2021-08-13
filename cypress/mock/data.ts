import type { DataFrame, TimeRange } from "@grafana/data";

enum LoadingState {
  NotStarted = "NotStarted",
  Loading = "Loading",
  Streaming = "Streaming",
  Done = "Done",
  Error = "Error",
}

function updateData(seriesArray: DataFrame[]): void {
  window.data = {
    state: LoadingState.Done,
    series: seriesArray,
    // TODO: add a proper TimeRange stub
    timeRange: {} as TimeRange,
  };
}

export { updateData };
