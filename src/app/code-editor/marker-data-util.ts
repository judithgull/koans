import {
  Feedback2,
  FeedbackType,
  SourceType,
  FeedbackDetails
} from '../common/model';

export function createMarkerData(f: Feedback2): monaco.editor.IMarkerData {
  return {
    severity: monaco.Severity.Error,
    message: f.message,
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: 1,
    endColumn: 1
  };
}

export function createMarkerData1(
  f: FeedbackDetails
): monaco.editor.IMarkerData {
  return {
    severity: monaco.Severity.Error,
    message: f.message,
    startLineNumber: 1,
    startColumn: 1,
    endLineNumber: 1,
    endColumn: 1
  };
}

export function createFeedbackDetails(
  m: monaco.editor.IMarkerData
): FeedbackDetails {
  return {
    success: false,
    message: m.message,
    startLineNumber: m.startLineNumber
  };
}

export function createFeedback(
  m: monaco.editor.IMarkerData,
  v: string
): Feedback2 {
  return {
    message: m.message,
    type: FeedbackType.Error,
    source: SourceType.Monaco,
    value: v,
    startLineNumber: m.startLineNumber
  };
}

export function filterEqualLines(
  markers: monaco.editor.IMarker[]
): monaco.editor.IMarker[] {
  const filteredMarkers: monaco.editor.IMarker[] = [];
  let j = -1;
  for (const e of markers) {
    if (e.startLineNumber !== j) {
      filteredMarkers.push(e);
    }
    j = e.startLineNumber;
  }
  return filteredMarkers;
}

export function getMonacoErrorMarkers(
  markers: monaco.editor.IMarker[]
): monaco.editor.IMarker[] {
  const sortedErrorMarkers = markers
    .filter(m => m.severity === monaco.Severity.Error)
    .filter(m => m.owner !== 'validation')
    .sort(
      (a: monaco.editor.IMarker, b: monaco.editor.IMarker) =>
        a.startLineNumber - b.startLineNumber
    );

  return sortedErrorMarkers;
}
