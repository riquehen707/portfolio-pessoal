import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDirectory=path.join(process.cwd(),"public","images","creators");
const portraits=[
["john-polidori","https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/John_William_Polidori_by_F.G._Gainsford.jpg/960px-John_William_Polidori_by_F.G._Gainsford.jpg"],
["sheridan-le-fanu","https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Joseph_Sheridan_Le_Fanu_P5862.jpg/960px-Joseph_Sheridan_Le_Fanu_P5862.jpg"],
["bram-stoker","https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Bram_Stoker_1906.jpg/960px-Bram_Stoker_1906.jpg"],
["richard-matheson","https://upload.wikimedia.org/wikipedia/commons/a/a3/Richard_Matheson.jpg"],
["anne-rice","https://upload.wikimedia.org/wikipedia/commons/5/55/Anne_Rice.jpg"],
["george-r-r-martin","https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/George_R._R._Martin_%2854743316729%29_%28cropped%29.jpg/960px-George_R._R._Martin_%2854743316729%29_%28cropped%29.jpg"],
["octavia-e-butler","https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Butler_signing.jpg/960px-Butler_signing.jpg"],
["mary-shelley","https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Mary_Wollstonecraft_Shelley_Rothwell.tif/lossy-page1-960px-Mary_Wollstonecraft_Shelley_Rothwell.tif.jpg"],
["henry-james","https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Henry_James_by_John_Singer_Sargent_cleaned.jpg/960px-Henry_James_by_John_Singer_Sargent_cleaned.jpg"],
["shirley-jackson","https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Shirley_Jackson_1940s.png/960px-Shirley_Jackson_1940s.png"],
["ira-levin","https://upload.wikimedia.org/wikipedia/commons/5/57/Portrait_photograph_of_Ira_Levin_by_Inge_Morath%2C_c._1967.jpg"],
["toni-morrison","https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Toni_Morrison.jpg/960px-Toni_Morrison.jpg"],
["ray-bradbury","https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Ray_Bradbury_%281975%29_-cropped-.jpg/960px-Ray_Bradbury_%281975%29_-cropped-.jpg"],
["gene-colan","https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/GeneColan6.13.09ByLuigiNovi.jpg/960px-GeneColan6.13.09ByLuigiNovi.jpg"],
["alan-moore","https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Alan_Moore_%282%29.jpg/960px-Alan_Moore_%282%29.jpg"],
["marv-wolfman","https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Marv_Wolfman_by_Gage_Skidmore.jpg/960px-Marv_Wolfman_by_Gage_Skidmore.jpg"],
["neil-gaiman","https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Kyle-cassidy-neil-gaiman-April-2013.jpg/960px-Kyle-cassidy-neil-gaiman-April-2013.jpg"],
["mike-mignola","https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/0/0f/MikeMignolaJune2011.jpg&w=800"],
["junji-ito","https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/a/ad/Junji_Ito_-_Lucca_Comics_%26_Games_2018_02.jpg&w=800"],
["jeff-lemire","https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/0/03/Jeff_Lemire_-_Lucca_2017.jpg&w=800"],
];
await mkdir(outputDirectory,{recursive:true});
for(const [slug,url] of portraits){const target=path.join(outputDirectory,`${slug}.webp`);try{await access(target);console.log(`${slug}: já existe`);continue}catch{}let response;for(let attempt=0;attempt<6;attempt++){response=await fetch(url,{headers:{"user-agent":"henrique.dog editorial catalog"}});if(response.status!==429)break;await new Promise(resolve=>setTimeout(resolve,3000*(attempt+1)))}if(!response?.ok)throw new Error(`${slug}: HTTP ${response?.status}`);const written=await sharp(Buffer.from(await response.arrayBuffer())).rotate().resize(640,800,{fit:"cover",position:"attention"}).webp({quality:84}).toFile(target);console.log(`${slug}: ${written.width}x${written.height}`);await new Promise(resolve=>setTimeout(resolve,1500))}
