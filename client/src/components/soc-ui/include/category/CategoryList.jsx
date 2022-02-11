import React from 'react';
import Category from './Category';


const CategoryList = (props) => {
    return (
        <div className="container-fluid">
            {props.categories.map((category) => (
                <div className="row" style={{marginTop: "25px"}}>
                    <Category
                        id={category.id}
                        name={category.name}
                        avatar={category.avatar}
                        count={category.count}
                        key={category.id}
                     />
                </div>
            ))}
        </div>
    )
}

export default CategoryList;