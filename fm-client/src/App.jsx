// basic
import { useEffect, useState } from 'react';
import React from 'react';

// routing 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//components
import AboutUs from './myComponents/about/AboutUs.jsx';
import Background from './myComponents/shared/Background/Background.jsx';
import Navbar from './myComponents/shared/navbar/Navbar.jsx';
import Hero from './myComponents/shared/Hero/Hero.jsx'
import PageHome from './myComponents/home/PageHome/PageHome.jsx';
// import bootstrap from 'bootstrap/dist/css/bootstrap.css';

function App() {

  let heroData=[
    {text1:"Premium Busses",text2:"at your service"}, // for bus1 image
    {text1:"Dive into",text2:"a luxurious journey"}, // for bus2 image and so on
    {text1:"Our motto,",text2:"your satisfaction"},
    {text1:"We provide",text2:"Best in class Busses"},
    {text1:"Enjoy your",text2:"journey with us!"},
  ];

  //A hero is a container for your site’s most important content. 
  //It’s the largest and most visible container on the page and it should be used to showcase your brand or product.
  const [heroCount, setHeroCount]= useState(4); 
  // here heroCount is the count of the images of bus

  const [playStatus,setPlayStatus]=useState(false);
// playStatus is the status of background video. if true, video will play.


useEffect(()=>{// creating slideshow
  setInterval(()=>{// putting images in loop and setting delay
    setHeroCount((count)=>{return count===4 ? 0 : count+1})
  },3000);
},[]);

  return (

    <Router>
      <Routes>
        <Route index element={<Hero/>} />
        <Route path='/about-us' element={<AboutUs/>} />
        {/* <Route path='/PageHome' element={<PageHome/>} /> */}


          {/* <Route path="/" element={<Truck/>}></Route>
          <Route index element={<Home/>}></Route>
          <Route path="Bus" element={<Bus/>}></Route>
          <Route path="truck" element={<Truck/>}></Route>
          <Route path="ferry" element={<Ferry/>}></Route> */}
      </Routes>
      

    <div classNameName="App">
      <Background // passing the props
        playStatus={playStatus} 
        heroCount={heroCount}
      /> 
      <Navbar/>
      <Hero // passing the props
        setPlayStatus={setPlayStatus}
        heroData={heroData[heroCount]}
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        playStatus={playStatus}
      />
    </div>
    </Router>
  );
}

export default App;