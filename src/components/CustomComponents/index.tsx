import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/reducers';
import { BtnProp } from "../../types"

export const Button = (props: BtnProp) => {

    const { loading } = useAppSelector((state: RootState) => state.user);

    const styles = {
        btn: 'self-center transition w-[50%] ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-200 bg-[#212222] my-5 text-white rounded-full px-4 py-2'
    };

    return (
        <button onClick={props.onClick} className={styles.btn} type={props.type}>
            {loading ? 'loading...' : props.buttonText}
        </button>
    )
}