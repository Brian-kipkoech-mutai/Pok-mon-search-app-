const fetchData= async()=>{
   try{
    
    const response =await fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon');
    if(!response.ok){
          throw new Error('error')
    }
     generalData=await response.json()


}
catch(error){
   console.log(error,'error');
}
}
fetchData()
const pokemonObjData =async(url)=>{
    let data=[]
    try{
        const response= await fetch(url);
        if(!response.ok){
            throw new Error('failed to get specific pokemon')
        }
         data =  await response.json()
        
    }
    catch(error){
       
     console.warn(error);
    }
  
 return data;
}
let generalData=[]
 
const input =document.getElementById('search-input');
const searchBtn=document.getElementById('search-button');
const pokemonNameTxt=document.getElementById('pokemon-name');
const pokemonIdTxt= document.getElementById('pokemon-id');
const weightTxt = document.getElementById('weight');
const heightTxt= document.getElementById('height');
const pokemonImg=document.getElementById('img-container');
const typesTxt= document.getElementById('types');
const hpTxt= document.getElementById('hp');
const attackTxt= document.getElementById('attack');
const defenseTxt= document.getElementById('defense');
const saTxt= document.getElementById('special-attack');
const sdTxt= document.getElementById('special-defense');
const speedTxt= document.getElementById('speed'); 

searchBtn.addEventListener('click', async()=>{
    const {results}=generalData;
    const inputValue=input.value.toLowerCase().match(/[a-z]?[0-9]?-?/g).join('').trim();
     if( inputValue){
    
   const pokemonObject= Number(inputValue)
                        ?results.find(({id})=>id==Number(inputValue))
                        :results.find(({name})=>name==inputValue);
         
  
   try{
    const{url}=pokemonObject;
    const data =  await pokemonObjData(url);
    const {height,weight,sprites,name,id,types,stats}=data;
    const {"front_default":imgSrc}=sprites;
    const typesArray=types.map(({type})=>type.name)
    const statsObj={};
        stats.forEach(each=> {
            const{base_stat,stat}=each;
             const {name}=stat;
            statsObj[name]=  base_stat;
            
        });
    
        const {attack,defense,hp,"special-attack":specialAttack,"special-defense":specialDefense,speed}=statsObj;
    
    pokemonNameTxt.textContent=name;
    pokemonIdTxt.textContent=id;
    pokemonImg.innerHTML=`<img src="${imgSrc}" alt="Image of ${name}pokemon" id="pokemon-img">`;
    weightTxt.textContent=weight;
    heightTxt.textContent=height;
    typesTxt.innerHTML=typesArray.map((type)=>`<div>${type.toUpperCase()}</div>`).join('');
    hpTxt.textContent=hp;
    attackTxt.textContent=attack;
    defenseTxt.textContent=defense;
    saTxt.textContent=specialAttack;
    sdTxt.textContent=specialDefense;
    speedTxt.textContent=speed;


   }
   catch (error){

    if(!pokemonObject){
        alert("Pokémon not found");
        pokemonNameTxt.textContent='';
        pokemonIdTxt.textContent='';
        pokemonImg.innerHTML='';
        weightTxt.textContent='';
        heightTxt.textContent='';
        typesTxt.innerHTML='';
        hpTxt.textContent='';
        attackTxt.textContent='';
        defenseTxt.textContent='';
        saTxt.textContent='';
        sdTxt.textContent='';
        speedTxt.textContent='';
    
      
    }

   }
       
      
     }
})


        