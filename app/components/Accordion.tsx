import React, { ReactNode, useState } from "react";

interface AccordionProps {
  title: string;
  cta: string;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, cta, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div className="pb-2 flex items-center">
        <div
          className="flex gap-2 items-end cursor-pointer"
          onClick={toggleAccordion}
        >
          <div className="font-semibold text-sm">{title}</div>
          <span className="accordion-icon">
            <i
              className={`${
                isOpen ? "icon-arrow-up-submenu" : "icon-arrow-down-submenu"
              }`}
            ></i>
          </span>
        </div>
        <div className="rounded cursor-pointer p-2 text-xs font-medium text-white bg-purple text-center ml-auto">
          {cta}
        </div>
      </div>
      {isOpen && <div className="">{children}</div>}
    </div>
  );
};

export default Accordion;
