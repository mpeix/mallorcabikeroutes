import HollowButton from "../Common/hollowButton";
import SolidButton from "../Common/solidButtony";

function Home({}){

    return(
        <div class="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
        <div class="container mx-auto px-6 flex relative py-16">
            <div class="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                <span class="w-20 h-2 bg-gray-800 dark:bg-white mb-12">
                </span>
                <h1 class="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                    Gaudeix <span class="text-5xl sm:text-7xl">Pedalant</span>
                </h1>
                <p class="text-sm sm:text-base text-gray-700 dark:text-white">
                    Descobreix rutes ciclistes per Mallorca. Consulta els detalls de cada ruta per poder gestionar
                    millor els teus esforços.
                </p>
                <div class="flex mt-8">
                    <SolidButton IsLink={true} Url="routes" Text="Routes" TailwindColor="themecolor1" MaxFontSize={16}/>
                    <HollowButton IsLink={true} Url="info" Text="Informació útil" TailwindColor="themecolor1" MaxFontSize={16}/>
                </div>
            </div>
            <div class="hidden sm:block sm:w-1/3 lg:w-3/5 relative" 
                    style={{backgroundImage:'url(./assets/img/Portada.jpg)', backgroundSize:'cover', backgroundRepeat:'no-repeat'}}>
                {/*<img src="./assets/img/Portada.jpg" class="max-w-xs md:max-w-sm m-auto"/>*/}
            </div>
        </div>
    </div>
    )
}

export default Home;