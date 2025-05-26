import React from "react";
import CustomDropdown from "./components/CustomDropDown";
import "./assets/styles/index.scss";

const App: React.FC = () => {
  const dropdownItems = [
    "Education 🎓",
    "Yeeeah, science! 🔬",
    "Art 🎨",
    "Sport ⚽",
    "Games 🎮",
    "Health 🩺",
  ];

  return (
    <div>
      <CustomDropdown items={dropdownItems} placeholder="Select an option..." />
    </div>
  );
};

export default App;
