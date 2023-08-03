import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import avatar from "../../data/avatar.jpg";

import { Cart, Chat, Notification, UserProfile } from "./";
import { setActiveMenu, handelClick, setScreenSize } from "../../app/uiSlice";

import { useDispatch, useSelector } from "react-redux";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      style={{ color: color }}
      onClick={customFunc}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);
const Navbar = () => {
  const user = useSelector(state => state.auth.user);
  const { activeMenu, screenSize, currentColor, isClicked } = useSelector(
    (state) => state.ui
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const handelResize = () => {
      dispatch(setScreenSize(window.innerWidth));
    };
    window.addEventListener("resize", handelResize);

    handelResize();

    return () => window.removeEventListener("resize", handelResize);
  }, [dispatch]);

  useEffect(() => {
    if (screenSize <= 900) {
      dispatch(setActiveMenu(false));
    } else {
      dispatch(setActiveMenu(true));
    }
  }, [screenSize, dispatch]);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative ">
      <NavButton
        title={"Menu"}
        customFunc={() =>
          dispatch(
            setActiveMenu(!activeMenu)
          )
        }
        color={currentColor}
        icon={<AiOutlineMenu />}
      />

      <div className="flex">

        {/* <NavButton
          title={"Cart"}
          customFunc={() => {
            dispatch(handelClick("cart"));
          }}
          color={currentColor}
          icon={<FiShoppingCart />}
        />

        <NavButton
          title={"Chat"}
          customFunc={() => {
            dispatch(handelClick("chat"));
          }}
          dotColor="#0ec9d7"
          color={currentColor}
          icon={<BsChatLeft />}
        />

        <NavButton
          title={"Notification"}
          customFunc={() => {
            dispatch(handelClick("notification"));
          }}
          dotColor="#0ec9d7"
          color={currentColor}
          icon={<RiNotification3Line />}
        /> */}

        <TooltipComponent content={"Profile"} position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => {
              dispatch(handelClick("userProfile"));
            }}
          >
            {user?.image && <img src={user?.image} alt={user.name} className="rounded-full w-8 h-8 " />}
            <p>
              <span className="text-gray-400 text-14">Hi, </span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {user?.name.toLocaleUpperCase()}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14 " />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile user={user} />}
      </div>
    </div>
  );
};

export default Navbar;
