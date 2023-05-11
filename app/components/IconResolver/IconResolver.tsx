import React, { useState, useEffect } from "react";

interface IconProp {
  icon: Object;
}

const IconResolver: React.FC<IconProp> = ({ icon }) => {
  const [IconComponent, setIconComponent] = useState<any>();

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const iconModule = await import(
          `../../../node_modules/iconoir-react/dist/${icon}.tsx`
        );
        const { default: Icon } = iconModule;
        setIconComponent(() => Icon);
      } catch (error) {
        console.error(error);
      }
    };

    if (icon) {
      loadIcon();
    }
  }, [icon]);

  return IconComponent ? <IconComponent /> : null;
};

export default IconResolver;
