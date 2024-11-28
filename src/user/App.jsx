import "../css/App.css";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from '../other/header.jsx';
import Footer from '../other/footer.jsx';

function Home() {
  
  return (
    <>
      <Header />
      <section className="flex flex-col bg-[#16161a] items-center justify-between">
        <div className="flex items-center pt-20 pb-20">
          <div className="flex-col">
            <motion.h1 initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}} viewport={{once: true}} id="titulo-principal" className="text-[#fffffe] text-5xl ml-10 mr-10">JJ's CAR RENT</motion.h1> <br />
            <motion.h2 initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}} viewport={{once: true}} id="texto" className="text-[#94a1b2] w-96 ml-10 mr-10">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum blanditiis eveniet ratione velit facere, impedit rem vel perferendis et deleniti doloremque reprehenderit incidunt tempora recusandae accusamus repellendus fugit dignissimos officia.
            </motion.h2> <br />
            <Link to="/registro">
              <motion.button initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}} viewport={{once: true}} 
              id="registrarse" className="ml-10 text-[#fffffe] bg-[#7f5af0] rounded-lg border-2 p-2 text-lg duration-150 hover:scale-105">
                Regístrate Aquí
              </motion.button>
            </Link>
          </div>

          <div>
            <motion.img initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}} viewport={{once: true}} src="/src/assets/459918618onixbaja.jpg" alt="" className="m-10"/>
          </div>
        </div>
      </section>

      <section className="bg-[#16161a] flex justify-center p-32">
        <div className="flex">
          <motion.div initial={{rotate: -180, x: -200}} whileInView={{rotate: 0, x: 0}} transition={{duration: 1}} viewport={{once: true}} 
          className="h-80 w-60 bg-[#7f5af0] rounded-lg m-20">
            <h2 id="titulo2" className="text-[#fffffe] p-8 text-xl">Variedad</h2>
            <p id="texto4" className="text-[#fffffe] pl-8 pr-6 pb-8">Explora una amplia selección de vehículos de todas las marcas, modelos y estilos. 
              Desde autos nuevos hasta usados certificados, tenemos el auto perfecto para ti.</p>
          </motion.div>

          <motion.div initial={{rotate: -180, x: -400}} whileInView={{rotate: 0, x: 0}} transition={{duration: 1}} viewport={{once: true}} 
          className="h-80 w-60 bg-[#94a1b2] rounded-lg m-20">
            <h2 id="titulo2" className="text-[#fffffe] p-8 text-xl">Financiamiento y Ofertas</h2>
            <p id="texto4" className="text-[#fffffe] pl-8 pr-6 pb-8">Ofrecemos planes de pago flexibles y promociones exclusivas. 
              Compra tu vehículo con comodidad y seguridad financiera.</p>
          </motion.div>

          <motion.div initial={{rotate: -180, x: -600}} whileInView={{rotate: 0, x: 0}} transition={{duration: 1}} viewport={{once: true}} 
          className="h-80 w-60 bg-[#7f5af0] rounded-lg m-20">
            <h2 id="titulo2" className="text-[#fffffe] p-8 text-xl">Confianza y Garantía</h2>
            <p id="texto4" className="text-[#fffffe] pl-8 pr-6 pb-8">Todos nuestros autos cuentan con garantía y revisión técnica. 
              Disfruta de una experiencia segura y transparente.</p>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#16161a] flex flex-col items-center">
        <motion.h2 initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}} viewport={{once: true}} id="titulo2" className="text-5xl text-center text-white">SERVICIOS</motion.h2>
        <div className="flex flex-row">
          <motion.div initial={{x: -200, opacity: 0}} whileInView={{x: 10, opacity: 1}} transition={{duration: 1.5}} viewport={{once: true}} id="div1" className="h-60 w-96 bg-cover bg-center rounded-lg p-10 m-32 ml-0 mr-20">
            <h3 id="texto3" className="text-[#fffffe] text-2xl">
              Reserva <br /> <br />
              <p id="texto4" className="text-base text-[#fffffe]"> Reserva el vehículo de tu preferencia </p> <br />
              <Link to="/vehiculos">
                <button id="texto4" className="rounded-lg border-2 p-2 text-base text-[#fffffe] transition duration-150 ease-in-out hover:bg-[#ffffee] hover:bg-opacity-10 hover:scale-105">
                  Reservar
                </button>
              </Link>
            </h3>
          </motion.div>

          <motion.div initial={{x: -400, opacity: 0}} whileInView={{x: -10, opacity: 1}} transition={{duration: 1.5}} viewport={{once: true}} id="div2" className="h-60 w-96 bg-cover bg-center rounded-lg p-10 m-32 mr-0 ml-20">
            <h3 id="texto3" className="text-[#fffffe] text-2xl">
              Soporte <br /> <br />
              <p id="texto4" className="text-base text-[#fffffe]"> Contacta con alguien para más ayuda </p> <br />
              <button id="texto4" className="rounded-lg border-2 p-2 text-[#fffffe] text-base transition duration-150 ease-in-out hover:bg-[#ffffee] hover:bg-opacity-10 hover:scale-105">
                Contactar
              </button>
            </h3>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
