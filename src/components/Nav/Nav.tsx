import React from 'react';
import { Link } from "react-router-dom"
import { authActions } from '../../store';
import { useAppDispatch } from '../../store/hooks';

const Nav = () => {

    const dispatch = useAppDispatch();

    const logout = () => {
        dispatch(authActions.logout());
    }

    const isAuthenticate: boolean = false;

    const { btnlink, logolink, navWrapper, avatarLogout, image } = navStyles;

    return (
        <nav className={navWrapper}>
            <Link className={logolink} to="/">
                K-Homes
            </Link>
            <div>
                {isAuthenticate ? (
                    <div className={avatarLogout}>
                        <span className={btnlink} onClick={logout}>
                            Logout
                        </span>
                        <img
                            className={image}
                            src="/docs/images/people/profile-picture-5.jpg"
                            alt="avatar"
                        />
                    </div>
                ) : (
                    <Link className={btnlink} to='/login'>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    )
}

const navStyles = {
    btnlink: 'border cursor-pointer rounded-sm border-[#212222] py-1 px-3 hover:bg-[#212222] hover:text-white',
    logolink: 'text-3xl text-[#212222] cursor-pointer font-semibold',
    navWrapper: 'flex justify-between items-center',
    avatarLogout: 'flex flex-row items-center align-middle justify-center gap-4',
    image: 'w-10 h-10 rounded-full'
}

export default Nav
