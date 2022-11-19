import NavBar from "./navbar";
function Header({}){

    return(
        <header className="h-24 sm:h-32 flex items-center z-30 w-full">
          <div className="container mx-auto px-6 flex items-center justify-between">
              <div className="uppercase text-gray-800 dark:text-white font-black text-3xl">
                  Mallorca Cycling Routes
              </div>
              <div class="flex items-center">
                  <NavBar />
                  <button className="lg:hidden flex flex-col ml-4">
                      <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1">
                      </span>
                      <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1">
                      </span>
                      <span className="w-6 h-1 bg-gray-800 dark:bg-white mb-1">
                      </span>
                  </button>
              </div>
          </div>
      </header>
    )
}

export default Header;