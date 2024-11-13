import React from "react";
import MenuItem from "./MenuItem"; // Import the MenuItem component
import { CCol, CContainer, CRow } from "@coreui/react";

function Category({ category }) {
  return (
    <div className="category">
      <h2>{category.name}</h2>

      <CContainer>
        <CRow >
          {category.subcategories.map((itemSub, index) => (
            <CCol>      
                    <h3 className="subcategory">{itemSub.name}</h3>

              {itemSub.items.map(itemP => (<MenuItem key={index} item={itemP} />))
             }
              </CCol>
      ))}
        
</CRow>
</CContainer>



    </div>
  );
}

export default Category;
