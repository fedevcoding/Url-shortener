import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DarkUnica from "highcharts/themes/dark-unica";
import { Options } from "highcharts";

DarkUnica(Highcharts);

export const StackedBarChart = ({
  //   items,
  title,
}: {
  //   items: { name: string; y: number }[];
  title: string;
}) => {
  const options: Options = {
    chart: {
      backgroundColor: "transparent",
      plotShadow: true,
      type: "bar",
      style: {
        fontFamily: "Open Sans",
      },
    },
    title: {
      text: title,
      style: {
        fontFamily: "inherit",
      },
    },
    xAxis: {
      labels: {
        enabled: false,
      },
      visible: false,
    },
    yAxis: {
      enabled: false,
      labels: {
        enabled: false,
      },
      visible: false,
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat:
        '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
    },
    plotOptions: {
      series: {
        stacking: "normal",
        dataLabels: {
          enabled: true,
          format: "{point.percentage:.0f}%",
        },
      },
    },
    series: [
      {
        name: "Mobile",
        type: "bar",
        data: [7],
      },
      {
        name: "PC",
        type: "bar",
        data: [2],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
