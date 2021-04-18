export type StartPlotType = {
  type: 'start';
  timestamp: number;
  select: string[];
  group: string[];
};

export type StopPlotType = {
  type: 'stop';
  timestamp: number;
}

export type SpanPlotType = {
  type: 'span';
  timestamp: number;
  begin: number;
  end: number;
};

export type DataPlotType = {
  type: 'data';
  timestamp: number;
  os: string;
  browser: string;
  'min_response_time': number;
  'max_response_time': number;
}

export type PlotType = StartPlotType|StopPlotType|SpanPlotType|DataPlotType;

export const convertTimestampToHour = (timestamp: number) => {
  const date = new Date(timestamp);
  const m = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');
  return `${m}:${s}`;
};

export const getPlotData = (data: PlotType[]): DataPlotType[] => {
  const { begin, end } = data.find((e) => e.type === 'span') as SpanPlotType;
  const fixedData: DataPlotType[] = [];

  if(!begin || !end) {
    alert('Check that the span input has been sent and that the begin and end data are valid.');
    return [];
  }

  // eslint-disable-next-line no-restricted-syntax
  for(const e of data) {
    if(e.type === 'stop') {
      break;
    }

    if(e.type === 'data' && e.timestamp >= begin && e.timestamp <= end) {
      fixedData.push(e);
    }
  }

  return fixedData as DataPlotType[];
};
