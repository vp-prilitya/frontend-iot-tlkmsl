export default function Navbar() {
  return (
    <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200 backdrop-blur flex-none transition-colors ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/04/Telkomsel_%282021%29.svg"
          className="h-6 mr-3"
          alt="Flowbite Logo"
        />

        <div className="flex md:order-2"></div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        ></div>
      </div>
    </nav>
  );
}
