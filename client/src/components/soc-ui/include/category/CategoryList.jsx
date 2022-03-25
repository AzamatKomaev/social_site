import React from 'react';
import Category from './Category';
import {useSelector} from "react-redux";


const CategoryList = () => {
    const categoryReducer = useSelector(state => state.category)

    return (
        <div className="container-fluid">
            {categoryReducer.list.map((category) => (
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