import { useState, useEffect, useMemo } from "react";

/**
 * Interface for the properties of the CircleDisplay component.
 */
interface IComponentProps {
  /**
   * The radius of the main circle. Default is 150.
   */
  circle_radius?: number;

  /**
   * The spacing between circles in the display. Default is 40.
   */
  circle_spacing?: number;

  /**
   * The radius of the individual items within the circle. Default is 14.
   */
  circle_item_radius?: number;

  /**
   * The spacing between individual items within the circle. Default is 3.
   */
  circle_item_spacing?: number;

  /**
   * The dataset to be displayed as items within the circle. Default is an empty array.
   */
  dataset?: string[];
}

/**
 * CircleDisplay component that displays items in a circular layout with animation.
 *
 * @param {IComponentProps} props - The properties for the CircleDisplay component.
 * @returns JSX.Element
 */

const CircleDisplay = ({
  circle_radius = 150,
  circle_item_radius = 14,
  circle_spacing = 40,
  circle_item_spacing = 3,
  dataset = [],
}: IComponentProps) => {
  /**
   * Calculates the number of items that can be displayed in a circle.
   * @returns {number}
   */
  const ITEMS_PER_CIRCLE = useMemo(() => {
    const base_total = Math.floor(
      (2 * Math.PI * circle_radius) / (2 * circle_item_radius)
    );
    return Math.floor(base_total / circle_item_spacing);
  }, [circle_item_radius, circle_radius, circle_item_spacing]);

  const [angles, setAngles] = useState<number[]>([]);
  const [speeds] = useState<number[]>(() =>
    Array(ITEMS_PER_CIRCLE)
      .fill(0)
      .map(() => Math.random() * (0.003 - 0.002) + 0.002)
  );

  useEffect(() => {
    const updateAngles = () => {
      setAngles((prevAngles) =>
        prevAngles.map((angle, index) => {
          // for varying speed
          // const newAngle = angle + speeds[index];

          // for constant speed
          // play around with 0.001 to make it faster, slow or go in reverse
          const newAngle = angle + 0.002;
          return newAngle % (2 * Math.PI);
        })
      );
      requestAnimationFrame(updateAngles);
    };
    requestAnimationFrame(updateAngles);
  }, [speeds]);

  /**
   * Calculates the positions of the items based on their angles.
   * @returns {Array<{x: number, y: number}>}
   */
  const positions = useMemo(() => {
    return angles.map((angle) => {
      const x =
        circle_radius + circle_radius * Math.cos(angle) - circle_item_radius;
      const y =
        circle_radius + circle_radius * Math.sin(angle) - circle_item_radius;
      return { x, y };
    });
  }, [angles, circle_radius, circle_item_radius]);

  useEffect(() => {
    if (angles.length === 0) {
      const newAngles = Array.from({ length: ITEMS_PER_CIRCLE }).map(
        (_, index) => (index / ITEMS_PER_CIRCLE) * 2 * Math.PI
      );
      setAngles(newAngles);
    }
  }, [ITEMS_PER_CIRCLE, angles.length]);

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
        {positions.length > 0 &&
          dataset.slice(0, ITEMS_PER_CIRCLE).map((_, index) => {
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
