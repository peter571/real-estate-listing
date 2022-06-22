import React, { useEffect } from "react"
import { propertyActions } from "../../store";
import Property from "../Property/Property"
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from '../../store/reducers';
import Loader from "../Loader";


const Properties = () => {

    const dispatch = useAppDispatch();
    const { items, loading } = useAppSelector((state: RootState) => state.properties);

    useEffect(() => {
        if (items.length === 0) {
            dispatch(propertyActions.fetchItems())
        }
    }, []);

    return (
        <div>
            {loading ? (
                <Loader />
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