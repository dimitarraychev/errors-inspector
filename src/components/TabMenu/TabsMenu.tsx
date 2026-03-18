import Tab from "../Tab/Tab";
import "./TabsMenu.css";
import prevArrow from "../../assets/prev-arrow.svg";
import nextArrow from "../../assets/next-arrow.svg";

interface TabsMenuProps {
  tabs: string[];
  selectedTab: string;
  onChange: (tab: string) => void;
}

const TabsMenu = ({ tabs, selectedTab, onChange }: TabsMenuProps) => {
  const handleTabChange = (e: string) => {
    onChange(e);
  };

  return (
    <div className="tabs-menu">
      <div className="arrow-wrapper">
        <img src={prevArrow} alt="previous" className="arrow prev-arrow" />
      </div>

      {tabs.map((tab) => (
        <Tab
          key={tab}
          text={tab}
          title={tab}
          isSelected={selectedTab === tab}
          onClick={() => handleTabChange(tab)}
        />
      ))}
      <div className="arrow-wrapper">
        <img src={nextArrow} alt="next" className="arrow next-arrow" />
      </div>
    </div>
  );
};

export default TabsMenu;
