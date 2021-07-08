import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";

interface NavbarProps {
  scroll: boolean;
}

export default function Navbar({ scroll }: NavbarProps) {
  const menus = [
    { page: "/", text: "Home" },
    { page: "/competition", text: "Competition" },
    { page: "/webinar", text: "Webinar" },
  ];

  const signInHandler = () => {
    console.log("clicked");
  };

  return (
    <div
      className={`h-16 bg-black-80 ${
        scroll ? "md:bg-black-80" : "md:bg-transparent"
      } flex items-center px-6 md:px-nav w-full fixed z-50 transition-all`}
    >
      <NavbarDesktop handler={signInHandler} menus={menus} />
      <NavbarMobile handler={signInHandler} menus={menus} />
    </div>
  );
}
