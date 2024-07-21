import "./App.css";
import CircleDisplay from "./CircleDisplay";

const App = () => {
  const colorDatasets = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFA1",
    "#A1FF33",
    "#FF8C33",
    "#33A1FF",
    "#8C33FF",
    "#FFC300",
    "#DAF7A6",
    "#FF5733",
    "#C70039",
    "#900C3F",
    "#581845",
    "#2ECC71",
    "#3498DB",
    "#9B59B6",
    "#34495E",
    "#16A085",
    "#27AE60",
    "#2980B9",
    "#8E44AD",
    "#2C3E50",
    "#F39C12",
    "#E74C3C",
    "#ECF0F1",
    "#95A5A6",
    "#7F8C8D",
    "#D35400",
    "#1ABC9C",
    "#2ECC71",
    "#3498DB",
    "#9B59B6",
    "#34495E",
    "#16A085",
    "#27AE60",
    "#2980B9",
    "#8E44AD",
  ];

  return (
    <CircleDisplay
      circle_item_spacing={2.5}
      circle_spacing={40}
      circle_radius={40}
      dataset={colorDatasets}
    />
  );
};

export default App;
