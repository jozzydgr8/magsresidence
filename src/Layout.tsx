import { Outlet } from "react-router-dom"
import { Navbar } from "./shared/Navbar"
import { useEffect } from "react";
import { FlatButton } from "./shared/FlatButton";
import { handleRequest } from "./shared/handleRequest";
import ScrollToTop from "./shared/ScrollToTop";
export const Layout = ()=>{
  //useEffect for animation
useEffect(() => {
  const animation = () => {
    const leftAnimate =
      document.querySelectorAll(".animate-left");

    const rightAnimate =
      document.querySelectorAll(".animate-right");

    const downAnimate =
      document.querySelectorAll(".animate-down");

    const upAnimate =
      document.querySelectorAll(".animate-up");

    const windowHeight = window.innerHeight;

    rightAnimate.forEach((container) => {
      const containerPosition =
        container.getBoundingClientRect().top;

      if (containerPosition < windowHeight) {
        container.classList.add(
          "sectionAnimationRight"
        );
      }
    });

    leftAnimate.forEach((container) => {
      const containerPosition =
        container.getBoundingClientRect().top;

      if (containerPosition < windowHeight) {
        container.classList.add(
          "sectionAnimationLeft"
        );
      }
    });

    upAnimate.forEach((container) => {
      const containerPosition =
        container.getBoundingClientRect().top;

      if (containerPosition < windowHeight) {
        container.classList.add(
          "sectionAnimationUp"
        );
      }
    });

    downAnimate.forEach((container) => {
      const containerPosition =
        container.getBoundingClientRect().top;

      if (containerPosition < windowHeight) {
        container.classList.add(
          "sectionAnimationDown"
        );
      }
    });
  };

  // Check elements immediately when the page opens
  animation();

  // Continue checking while scrolling
  window.addEventListener("scroll", animation);

  // Cleanup when navigating to another page
  return () => {
    window.removeEventListener("scroll", animation);
  };
}, []);

    return (
        <>
            <ScrollToTop/>
            <Navbar/>
            <Outlet/>
             <FlatButton
          className="whatsappIcon borderlessbtn"
          onClick={() =>
            handleRequest(
            "Hi Mags Residence! 👋 I’m interested in booking a stay with you. I’d love to learn more about your available rooms, rates, amenities, and what’s included. Looking forward to hearing from you! 🏡✨"
          )
          }
        >
          <>
          <span className="chatText">Chat us now</span>

          <img
            src="https://cdn-icons-png.flaticon.com/128/3670/3670051.png"
            alt="Chat with BilingualChule"
          />
          </>
        </FlatButton>
        </>
    )
}