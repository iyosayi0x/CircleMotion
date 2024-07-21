import { useState, useEffect, useMemo } from "react";

interface IComponentProps {
  circle_radius?: number;
  circle_spacing?: number;
  circle_item_radius?: number;
  circle_item_spacing?: number;
  dataset?: string[];
}

const CircleDisplay = ({
  circle_radius = 150,
  circle_item_radius = 14,
  circle_spacing = 40,
  circle_item_spacing = 3,
  dataset = [],
}: IComponentProps) => {
  const ITEMS_PER_CIRCLE = useMemo(() => {
    const base_total = Math.floor(
      (2 * Math.PI * circle_radius) / (2 * circle_item_radius)
    );
    return Math.floor(base_total / circle_item_spacing);
  }, [circle_item_radius, circle_radius, circle_item_spacing]);

  const [angles, setAngles] = useState<number[]>(() =>
    Array(ITEMS_PER_CIRCLE)
      .fill(0)
      .map((_, index) => index * 2 * Math.PI)
  );
  const [speeds] = useState<number[]>(() =>
    Array(ITEMS_PER_CIRCLE)
      .fill(0)
      .map(() => (Math.random() - 0.5) * 0.01)
  );

  useEffect(() => {
    const updateAngles = () => {
      setAngles((prevAngles) =>
        prevAngles.map((angle, index) => {
          const newAngle = angle + speeds[index];
          return newAngle % (2 * Math.PI);
        })
      );
      requestAnimationFrame(updateAngles);
    };
    requestAnimationFrame(updateAngles);
  }, [speeds]);

  const positions = useMemo(() => {
    return angles.map((angle) => {
      const x =
        circle_radius + circle_radius * Math.cos(angle) - circle_item_radius;
      const y =
        circle_radius + circle_radius * Math.sin(angle) - circle_item_radius;
      return { x, y };
    });
  }, [angles, circle_radius, circle_item_radius]);

  return (
    <div className="circle-wrapper">
      <div
        className="circle-container"
        style={{
          width: circle_radius * 2,
          height: circle_radius * 2,
          position: "relative",
        }}
      >
        {dataset.slice(0, ITEMS_PER_CIRCLE).map((_, index) => {
          const { x, y } = positions[index];
          return (
            <div
              className="circle-item"
              key={index}
              style={{
                width: circle_item_radius * 2,
                height: circle_item_radius * 2,
                position: "absolute",
                left: x,
                top: y,
                background: _,
                borderRadius: "50%",
                transition: "transform 0.1s linear",
              }}
            />
          );
        })}
      </div>

      {dataset.slice(ITEMS_PER_CIRCLE).length > 0 && (
        <CircleDisplay
          circle_item_radius={circle_item_radius}
          circle_radius={circle_radius + circle_spacing}
          circle_item_spacing={circle_item_spacing}
          dataset={dataset.slice(ITEMS_PER_CIRCLE)}
        />
      )}
    </div>
  );
};

export default CircleDisplay;
