import { Avatar, Dropdown, DropdownHeader, DropdownItem, Navbar, NavbarBrand } from "flowbite-react";
import { useContext, useEffect } from "react";
import { Link } from "react-router";
import { userContext } from "../../context/userContext";

export default function Nav() {
    const { userData, getUserData, signOut } = useContext(userContext)

    useEffect(() =>{
        if (localStorage.getItem('token')) {
            getUserData(localStorage.getItem('token'))
        }
    },[])
    
    return (
        <>
            <Navbar className="p-4 shadow-2xs">
                <NavbarBrand href="/">
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Social Media App</span>
                </NavbarBrand>
                <div className="flex md:order-2">
                    {userData ? 
                    (<Dropdown arrowIcon={false} inline label={
                        <Avatar alt={userData?.name} img={userData?.photo} rounded />
                    } >
                        <DropdownHeader>
                            <p><span className="font-bold">Hello, </span>{userData?.name}</p>
                        </DropdownHeader>
                        <DropdownItem>Account</DropdownItem>
                        <DropdownItem onClick={signOut}>Sign out</DropdownItem>
                    </Dropdown>) : (<Link to={'/login'}>Login</Link>)
                    }
                </div>
            </Navbar >
        </>
    );
}
