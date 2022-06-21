import React, { useEffect, useState } from "react"
import { propertyActions } from "../../store";
import Property from "../Property/Property"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from '../../store/reducers';


const Properties = () => {

    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((state: RootState) => state.properties);

    console.log(items, loading)
    useEffect(() => {
        dispatch(propertyActions.fetchItems())
    }, [])
    
    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="flex justify-between gap-6 flex-wrap">
                    {[...items].map((item) => (
                        <Property key={item._id} {...item} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Properties;