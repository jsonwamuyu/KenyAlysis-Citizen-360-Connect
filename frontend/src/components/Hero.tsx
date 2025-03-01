import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="items-center justify-items-center flex flex-col h-full hero gap-4 mt-16 md:mt-24">
      <h1 className="sm:max-w-2xl text-center">Empowering citizens, enhancing governance</h1>
      <p className="sm:max-w-md text-center">
      Join <strong>Kenyslysis</strong> to report incidents, vote in polls, 
      and access summary of crucial government documents. Let's your voice be heard.
      </p>
      <div className="mt-8">
        <Link to='/login' className="cta-primary">Join the Movement TODAY</Link>
      </div>
    </div>
  );
};

export default Hero;
