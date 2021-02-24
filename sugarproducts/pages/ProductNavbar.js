import React from "react";
import Link from "next/link";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
// import NotificationsNoneRoundedIcon from "@material-ui/icons/NotificationsNoneRounded";
import LocalMallRoundedIcon from "@material-ui/icons/LocalMallRounded";
import KeyboardBackspaceRoundedIcon from "@material-ui/icons/KeyboardBackspaceRounded";
import Dotdotdot from 'react-dotdotdot'
// import cart from "./Cart";
import {useRouter} from 'next/router'
 
export default function ProductNavbar(props) {
const router = useRouter()
  const handleBack = () => {
    console.log("back")
    console.log(router)
    return router.back()
}
  return (
    <>
      <div className="d-block d-md-none">
        {/* <nav style={{ backgroundColor: "black" }} className="navbar fixed-top "> */}
        <div
          style={{ backgroundColor: "white", color:"black" }}
          className="container-fluid fixed-top py-2 pt-3"
        >
          <div
            // className="d-flex justify-content-around"
            className="row"
          >
            <div
              // className="px-2 py-1"
              className="col-1"
            >
              <Link href="/" as="/" >
                {/* <img src="/sugar-white-logo.png" className="" height="25px" /> */}
                <KeyboardBackspaceRoundedIcon
                  style={{ color: "black", fontSize: "25px" }}
                  onClick={handleBack}
                />
              </Link>
            </div>
            <div
              className="col-8 col-sm-9 "
            //   style={{ fontSize: "20px" }}
            >
                <Dotdotdot clamp={1}>
 
              <h5 className=" text-left">{props && props.title}</h5>
                </Dotdotdot>
            </div>
            {/* <div className="flex-grow-1">dfds</div> */}
            <div className="col-2 col-sm-2 ">
              <div
                className="d-flex justify-content-between "
                // style={{ marginLeft: "10.5em" }}
              >
                {/* <div className="col-4">
                  <Link href="/search" as="/search">
                    <SearchRoundedIcon
                      style={{ color: "black", fontSize: "25px" }}
                    />
                  </Link>
                </div> */}
                <div className="px-2">
                  {/* <img src="https://via.placeholder.com/20" /> */}
<Link href="/wishlist" as="/wishlist">
                  <FavoriteBorderRoundedIcon
                    style={{ color: "black", fontSize: "25px" }}
                  />
                  </Link>
                </div>
                <div className="px-2">
                  {/* <img src="https://via.placeholder.com/20" /> */}
                  <Link href="/cart" as="/cart">
                  <LocalMallRoundedIcon
                    style={{ color: "black", fontSize: "25px" }}
                  />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </nav> */}
      </div>
      <div className="d-none d-md-block" >
        {/* <nav class="navbar navbar-light bg-light"> */}
        <div class="container-fluid" style={{"maxHeight":"100px"}}>
          <div className="row">
            <div className=" col-2 ">
              <img
                src="/sugar-black-logo.jpg"
                alt=""
                width=""
                height=""
                className="py-3 img-fluid cursor"
              />
            </div>
            <div className="py-4 col-7">
              <div
                className="d-flex "
                style={{ border: "1px solid lightgray" }}
              >
                <input
                  type="text"
                  className=" py-2 flex-grow-1 outline-none"
                  placeholder="search for products"
                />
                <SearchRoundedIcon
                  style={{ color: "gray", fontSize: "25px " }}
                  className="m-2 cursor"
                />
              </div>
            </div>
            <div className=" col-3">
              <div className="d-flex justify-content-evenly py-4">
                <div className="cursor">Login/Register</div>
                <div>
                  {" "}
                  <FavoriteBorderRoundedIcon
                    style={{ color: "black", fontSize: "25px" }}
                    className="cursor"
                  />
                </div>
                <div>
                  <LocalMallRoundedIcon
                    style={{ color: "black", fontSize: "25px" }}
                    className="cursor"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </nav> */}
      </div>
    </>
  );
}
 
 

