import React, { ReactNode, useState } from "react";

interface AccordionProps {
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div
        className={`accordion-header cursor-pointer flex gap-2   items-end px-4 py-2 bg-gray-300 hover:bg-gray-400 ${
          isOpen ? "rounded-t-lg" : "rounded-lg"
        }`}
        onClick={toggleAccordion}
      >
        <div className="font-semibold text-sm">Lihat Varian Produk</div>
        <span className="accordion-icon">
          <i className={`${isOpen ? "icon-arrow-up-submenu" : "icon-arrow-down-submenu"}`}></i>
        </span>
      </div>
      {isOpen && <div className="">{children}</div>}
    </div>
  );
};

export default Accordion;
