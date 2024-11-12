import React from "react";
import Category from "./Category";
import { CCol, CRow } from "@coreui/react";

function MenuMain({ categories }) {
  return (
    <div className="menuMain" >
      <CRow className="mt-4">
        {categories.map((category, index) => (
          index === 1 ? (<CCol xl='4' md='4' className="mb-4"></CCol>) : (<CCol xl='4' md='4' className="mb-4">
<Category key={index} category={category} />
            </CCol>)

        )
        
        )
      }
        
      </CRow>
    </div>
  );
}

export default MenuMain;
