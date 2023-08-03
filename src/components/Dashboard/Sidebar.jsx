import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { links } from "../../data/dummy";


import {setActiveMenu} from '../../app/uiSlice'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
  


const Sidebar = () => {
  const { activeMenu , screenSize , currentColor} = useSelector(state => state.ui);
  const user = useSelector(state => state.auth.user);
  const role_id = user.role_id
  const dispatch = useDispatch();

  const handleCloseSideBar = ()=>{
    if(activeMenu && screenSize<=900){
      dispatch(setActiveMenu(false));
    }
  }


  const activeLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2`;
  const normalLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2`;

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto">
      {activeMenu && (
        <>
          {/*Start Logo Menu*/}
          <div className="flex justify-between items-center">
            <Link
              to={"/"}
              className="items-center gap-3 mt-4 ml-3 flex text-xl font-extralight tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Shoppy</span>
            </Link>
            <TooltipComponent content={"Menu"} position="BottomCenter">
              <button
                type="button"
                onClick={() => {
                  handleCloseSideBar()
                }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          {/*End Logo Menu*/}
          <div className="mt-10">
            {links.map((item , idx) => {            
              return (
                <div key={idx}>
                  <p
                    key={item.title}
                    className="dark:text-gray-400 text-gray-700  m-3 mt-4 uppercase cursor-pointer"
                  >
                    {item.title}
                  </p>
                  {item.links.filter(item => {
              if(item?.role_id){
                console.log(role_id , item?.role_id)
                if(item?.role_id > role_id){
                  return true;
                }
                return false;
              }
              return true;
            } ).map((link , idx) => (
                    <NavLink
                      to={`${link.name.split(" ").join("")}`}
                      key={idx}
                      onClick={() => {
                        handleCloseSideBar()
                      }}
                      style= {({isActive})=>({backgroundColor:isActive ? currentColor : '' })}
  
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      {link.icon}
                      <span className="capitalize">{link.name}</span> 
                    </NavLink>
                  ))}
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
