function NavBar ({}){
    return(
        <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
            <a href="/" className="py-2 px-6 flex">Home</a>
            <a href="/routes" className="py-2 px-6 flex">Rutes</a>
            <a href="/about" className="py-2 px-6 flex">Informació útil</a>
            <a href="/info" className="py-2 px-6 flex">About</a>
        </nav>
    )
}

export default NavBar;