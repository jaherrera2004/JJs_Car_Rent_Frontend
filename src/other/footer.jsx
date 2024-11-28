import '../css/footer.css';

function footer() {

    return <footer className="flex bg-[#16161a] p-8 text-lg items-center gap-10 space-x-[41rem] w-full h-24 ">
        <p className="text-[#fffffe]">Copyright® | Juan Herrera y Jose Polo</p>
        <div className="flex gap-10">
          <a href=""><img className="h-12 w-12 duration-200 hover:scale-125" src="src\assets\icons8-instagram-64.png" alt="" /></a>
          <a href=""><img className="h-12 w-12 duration-200 hover:scale-125" src="src\assets\icons8-facebook-nuevo-50.png" alt="" /></a>
          <a href=""><img className="h-12 w-12 duration-200 hover:scale-125" src="src\assets\icons8-x-50.png" alt="" /></a>
        </div>
    </footer>;
};

export default footer;