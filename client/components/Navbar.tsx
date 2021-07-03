import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  const menus = ["Home", "Competition", "Seminar"];

  const signInHandler = () => {
    console.log("clicked");
  };

  return (
    <div className="h-16 bg-black-80 flex items-center px-6 md:px-nav w-full fixed">
      <NavbarDesktop handler={signInHandler} menus={menus} />
      <NavbarMobile handler={signInHandler} menus={menus} />
    </div>
  );
}
