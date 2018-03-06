import { ErrorMarker, Feedback2, FeedbackType, SourceType } from '../model';

export function createMarkerData(e: ErrorMarker): monaco.editor.IMarkerData {
  return {
    severity: monaco.Severity.Error,
    message: e.message,
    startLineNumber: e.startLineNumber,
    startColumn: 1,
    endLineNumber: 1,
    endColumn: 1
  };
}

export function createErrorMarkers(m: monaco.editor.IMarkerData): ErrorMarker {
  return {
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
  markers: monaco.editor.IMarkerData[]
): monaco.editor.IMarkerData[] {
  const filteredMarkers: monaco.editor.IMarkerData[] = [];
  let j = -1;
  for (const e of markers) {
    if (e.startLineNumber !== j) {
      filteredMarkers.push(e);
    }
    j = e.startLineNumber;
  }
  return filteredMarkers;
}
/**
 * Get model markers
 */
export function getSortedErrorMarkers(
  markers: monaco.editor.IMarker[]
): monaco.editor.IMarker[] {
  const sortedErrorMarkers = markers
    .filter(m => m.severity === monaco.Severity.Error)
    .sort(compareLineAndOwner);
  return sortedErrorMarkers;
}

function compareLineAndOwner(
  a: monaco.editor.IMarker,
  b: monaco.editor.IMarker
) {
  if (a.startLineNumber === b.startLineNumber) {
    return compareOwner(a.owner, b.owner);
  }
  return a.startLineNumber - b.startLineNumber;
}

function compareOwner(a: string, b: string) {
  if (a === b) {
    return 0;
  } else if (a === 'validation') {
    return -1;
  }
  return 1;
}
