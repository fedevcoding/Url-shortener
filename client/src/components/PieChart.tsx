import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import DarkUnica from "highcharts/themes/dark-unica";
import { Options } from "highcharts";

DarkUnica(Highcharts);

export const PieChart = ({
  items,
  title,
  tooltipName,
  height,
  width,
}: {
  items: { name: string; y: number }[];
  title: string;
  tooltipName: string;
  height?: string;
  width?: string;
}) => {
  const options: Options = {
    chart: {
      backgroundColor: "transparent",
      plotShadow: true,
      type: "pie",
      style: {
        fontFamily: "Open Sans",
      },
      height,
      width,
    },
    title: {
      text: title,
      style: {
        fontFamily: "inherit",
      },
      align: "center",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}% ({point.y}</b>)",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        innerSize: "55%",
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: tooltipName,
        data: items,
        type: "pie",
      },
    ],
    legend: {
      enabled: false,
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
