import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

export default function Navbar() {
  const menus = [
    { page: "/", text: "Home" },
    { page: "/competition", text: "Competition" },
    { page: "/seminar", text: "Seminar" },
  ];

  const signInHandler = () => {
    console.log("clicked");
  };

  return (
    <div className="h-16 bg-black-80 flex items-center px-6 md:px-nav w-full fixed z-50">
      <NavbarDesktop handler={signInHandler} menus={menus} />
      <NavbarMobile handler={signInHandler} menus={menus} />
    </div>
  );
}
