import React, { useState } from 'react';
import { Link } from "react-router-dom"
import { authActions } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import defaultImg from '../../images/default.jpg';
import { RootState } from '../../store/reducers';
import { GoThreeBars } from 'react-icons/go';

const Nav = () => {

    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state: RootState) => state.user);
    const [toggle, setToggle] = useState(false);

    const logout = () => {
        dispatch(authActions.logout());
    }

    const navStyles = {
        btnlink: 'border cursor-pointer rounded-sm border-[#212222] py-1 px-3 hover:bg-[#212222] hover:text-white',
        logolink: 'text-3xl text-[#212222] cursor-pointer font-semibold',
        navWrapper: 'flex justify-between items-center',
        avatarLogout: 'flex flex-row items-center align-middle justify-center gap-4',
        image: 'w-10 h-10 rounded-full',
        bars: 'sm:hidden',
        navList: `${toggle ? '' : 'hidden'} sm:flex`
    };

    const { btnlink, logolink, navWrapper, navList, avatarLogout, bars, image } = navStyles;

    return (
        <nav className={navWrapper}>
            <Link className={logolink} to="/">
                254 Realtors
            </Link>
            <div>
                <GoThreeBars onClick={() => setToggle(!toggle)} size={30} className={bars}  />

                <div className={navList}>
                {isAuthenticated ? (
                    <div className={avatarLogout}>
                        <Link className={btnlink} to='/upload-property/images' >
                            Upload Property
                        </Link>
                        <span className={btnlink} onClick={logout}>
                            Logout
                        </span>
                        <img
                            className={image}
                            src={defaultImg}
                            alt="avatar"
                        />
                    </div>
                ) : (
                    <Link className={btnlink} to='/login'>
                        Login
                    </Link>
                )}
                </div>
            </div>
        </nav>
    )
}

export default Nav
