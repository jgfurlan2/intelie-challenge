import { shade } from 'polished';
import React, { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Button } from '~/components/UI/Button';
import initialData from '~/initialData.json';
import { getPlotData, convertTimestampToHour, PlotType, StartPlotType } from '~/utils/plotFunctions';
import { randomRGBA } from '~/utils/randomRGBA';

import { HomeChartContainer, HomeFooter, HomeHeader, HomePageContainer, HomeTextAreaContainer } from './styles';

type ChartCommon = {
  [x: string]: string;
}

type ChartDataState = {
  data: ChartCommon[];
  colors: ChartCommon[];
  labels: string[];
}

export const HomePage: React.FC = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [chartData, setChartData] = useState<ChartDataState>();

  const fixPlotData = (data: PlotType[]) => {
    const { select } = data.find((e) => e.type === 'start') as StartPlotType;

    if(!select) {
      alert('Check that the start entry has been sent and that the select option contains a valid entry.');
      return;
    }

    const plotReceivedData = getPlotData(data);
    const fixedData: ChartCommon[] = [];
    const colors: ChartCommon[] = [];
    const labels: string[] = [];

    plotReceivedData.forEach((unfixedData) => {
      select.forEach((filter) => {
        const timeAlreadyExists = fixedData.find((fixed) => fixed.time === convertTimestampToHour(unfixedData.timestamp));
        const key = `${unfixedData.os}_${unfixedData.browser}_${filter}`;

        if(timeAlreadyExists) {
          timeAlreadyExists[key] = unfixedData[filter];
        } else {
          fixedData.push({
            time: convertTimestampToHour(unfixedData.timestamp),
            [key]: unfixedData[filter],
          });
        }

        if(!labels.find((label) => label === key)) {
          labels.push(key);
        }

        if(!colors.find((color) => color.target === `${unfixedData.os}_${unfixedData.browser}`)) {
          const color = randomRGBA();
          colors.push({
            target: `${unfixedData.os}_${unfixedData.browser}`,
            min: shade(0.5, color),
            max: color,
          });
        }
      });
    });

    setChartData({ data: fixedData, labels, colors });
  };

  const applyPlotData = () => {
    if(textAreaRef.current) {
      try {
        const data = textAreaRef.current.value.split('\n');
        const fixedData: PlotType[] = data.filter((e) => !!e).map((e) => JSON.parse(e));

        fixPlotData(fixedData);
      } catch(err) {
        console.log(err);
        alert('Check informed data.');
      }
    }
  };

  useEffect(() => {
    if(textAreaRef.current) {
      fixPlotData(textAreaRef.current.value.split('\n').filter((e) => !!e).map((e) => JSON.parse(e)));
    }
  }, []);

  return (
    <HomePageContainer>
      <HomeHeader>
        João&apos;s Challenge
      </HomeHeader>

      <HomeTextAreaContainer>
        <textarea ref={textAreaRef} defaultValue={initialData.map((e) => JSON.stringify(e)).join('\n')} />
      </HomeTextAreaContainer>

      <HomeChartContainer>
        {chartData && (
          <>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData.data}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
                {chartData.labels.map((e) => {
                  const color = chartData.colors.find((cl) => e.includes(cl.target));

                  if(color) {
                    if(e.includes('min')) {
                      return <Line type="linear" dataKey={e} key={e} stroke={color.min} />;
                    }

                    return <Line type="linear" dataKey={e} key={e} stroke={color.max} />;
                  }

                  return <Line type="linear" dataKey={e} key={e} stroke={randomRGBA()} />;
                })}
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </HomeChartContainer>

      <HomeFooter>
        <Button onClick={applyPlotData}>GENERATE CHART</Button>
      </HomeFooter>
    </HomePageContainer>
  );
};
