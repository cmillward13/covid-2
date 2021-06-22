import Banner from '../componenets/Banner'
import LeftBar from '../componenets/LeftBar'
import Footer from '../componenets/Footer'
import VaccineChart from '../componenets/VaccineChart'
import {useState, useEffect} from 'react'
import CasesChart from '../componenets/CasesChart'
import Header from '../componenets/Header'

export default function Home(props) {

  //re-deploy website if we're missing data (make server fetch new data)
  var vaxcheck=props.VaxData.result.records
  var lastdate=new Date(vaxcheck[vaxcheck.length-1].Date)
  var today = new Date()
  today.setHours(0,0,0,0)

  if(lastdate<today && new Date().getHours()>=6){ //if we're missing data AND it's past 6am
    console.log('Thank you for updating the data today!')
    //re-deploy site!
    fetch('https://api.vercel.com/v1/integrations/deploy/prj_y9Z6HJAZ5OwSGL0L2Emio3y6qbhg/MH1nIGMQPW')
  }

  //Page Change
  const [page,setPage]=useState('Vaccines');
  function changePage(){
        return (page==='Vaccines' ? setPage('Cases'): setPage('Vaccines'))
  }

  //Page Size
  const [size, setSize]=useState({height:800,width:1000})
  function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };
  }

function resize(){
    function handleResize(){
        setSize({height:window.innerHeight,width:window.innerWidth})
    }

    const  debouncedHandleResize=debounce(handleResize,500)
    window.addEventListener('resize',debouncedHandleResize)

    return _=>{
        window.removeEventListener('resize', debouncedHandleResize)
        element.clear()
    }
}   

useEffect(()=>{
    function handleResize(){
        setSize({height:window.innerHeight,width:window.innerWidth})
    }

    const  debouncedHandleResize=debounce(handleResize,100)
    window.addEventListener('resize',debouncedHandleResize)

    return _=>{
        window.removeEventListener('resize', debouncedHandleResize)
    }
})

  switch(page){
    case 'Vaccines': 
      return (
      <div>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet"></link>
        <Header></Header>
        <Banner props={changePage}></Banner>
        <LeftBar></LeftBar>
        <VaccineChart props={{data:props.VaxData, size:size}}></VaccineChart>
        <Footer props={{page:page}}></Footer>
      </div>
      )
    
    case 'Cases':
      return(
        <div>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&display=swap" rel="stylesheet"></link>
          <Header></Header>
          <Banner props={changePage}></Banner>
          <CasesChart props={{data:props.CasesData, colors:props.ChartColors,size:size}}></CasesChart>
          <Footer props={{page:page}}></Footer>
        </div>
      )
  }
}

export const getStaticProps = async()=>{
  
  //GET CASES
  const cases = await (await fetch ('https://data.ontario.ca/api/3/action/datastore_search?resource_id=d1bfe1ad-6575-4352-8302-09ca81f7ddfc&limit=500000')).json();

  //GET VACCINATIONS
  const doses = await (await fetch ('https://data.ontario.ca/api/3/action/datastore_search?resource_id=775ca815-5028-4e9b-9dd4-6975ff1be021&limit=5000')).json();

  //GET STUPID ASS COLOURS
  const max = 255;

  function makeColor(){
      return (`rgba(${Math.floor(Math.random()*max)}, ${Math.floor(Math.random()*max)}, ${Math.floor(Math.random()*max)}, 0.5)`);
  }

  const colors=[];
  for(let i=0; i<33; i++){
      colors.push(makeColor());
  }

  

  return ({
      props:{
        VaxData:doses,
        CasesData:cases,
        ChartColors:colors
      }
  })
}
