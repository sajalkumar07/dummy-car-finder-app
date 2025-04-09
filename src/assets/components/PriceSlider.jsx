import { Slider } from "@mui/material";
import { useEffect, useState } from "react";

const PriceSlider = ({ min, max, value, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    setSliderValue(value);
  }, [value]);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="px-2 py-4">
      <Slider
        value={sliderValue}
        onChange={handleChange}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
        disableSwap
        sx={{
          color: "#3b82f6", // blue-500
          height: 6,
          "& .MuiSlider-thumb": {
            width: 16,
            height: 16,
            backgroundColor: "#fff",
            border: "2px solid currentColor",
            "&:hover": {
              boxShadow: "0 0 0 8px rgba(59, 130, 246, 0.16)",
            },
          },
          "& .MuiSlider-valueLabel": {
            backgroundColor: "#3b82f6", // blue-500
            borderRadius: 2,
            padding: "4px 8px",
            fontSize: 12,
          },
        }}
      />
    </div>
  );
};

export default PriceSlider;
