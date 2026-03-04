import Tab from "../Tab/Tab";
import "./TabsMenu.css";

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
      {tabs.map((tab) => (
        <Tab
          key={tab}
          text={tab}
          title={tab}
          isSelected={selectedTab === tab}
          onClick={() => handleTabChange(tab)}
        />
      ))}
    </div>
  );
};

export default TabsMenu;
