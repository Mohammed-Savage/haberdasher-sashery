// Set up our imports.
import React from "react";

// This is a placeholder component that will display the specific items in a category when called.
const Category = ({ category }) => {
    return (
        <div>
            <h2>{category}</h2>
            {/* I have to set up a display of items in this category */}
        </div>
    );
};

export default Category;