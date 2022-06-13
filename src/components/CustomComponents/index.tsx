import { BtnProp } from "../../types"

export const Button = (props: BtnProp) => {
    const styles = {
        btn: 'self-center transition w-[50%] ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-200 bg-[#212222] my-5 text-white rounded-full px-4 py-2'
    };

    return (
        <button className={styles.btn} type={props.type}>
            {props.buttonText}
        </button>
    )
}