import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDirectory=path.join(process.cwd(),"public","images","creators");
const files=[
["john-ajvide-lindqvist","1/1b/John_Ajvide_Lindqvist_at_G%C3%B6teborg_Book_Fair_2017.jpg"],
["justin-cronin","8/81/Justin_cronin_2012.jpg"],
["holly-black","a/a4/Holly_Black_Author_Photo_2020.jpg"],
["silvia-moreno-garcia","2/2d/Silvia_Moreno-Garcia_at_Historical_Novel_Society_North_America_Conference_2025_%28cropped%29.jpg"],
["grady-hendrix","e/ee/Grady_Hendrix_at_2023_National_Book_Festival_%2853123264409%29_%28cropped%29.jpg"],
["jeff-vandermeer","0/07/Jeff_VanderMeer_Portland_Garden.jpg"],
["mariana-enriquez","https://upload.wikimedia.org/wikipedia/commons/e/e5/Mariana_Enr%C3%ADquez_en_la_Feria_Internacional_del_Libro_de_Buenos_Aires.jpg"],
["stephen-graham-jones","7/7f/Stephen_Graham_Jones_at_National_Book_Festival_2025.jpg"],
["tananarive-due","6/68/2023_National_Book_Festival_%2853122448927%29_%28cropped%29.jpg"],
["raphael-montes","9/9b/Raphael_Montes_na_Bienal_do_Livro_Rio_2025.jpg"],
["joann-sfar","f/f1/Joann_Sfar_-_Le_Livre_sur_la_Place_%2821174021150%29.jpg"],
["steve-niles","5/57/Niles%2C_Steve_%282007%29.jpg"],
["scott-snyder","e/e0/5.22.24ScottSnyderByLuigiNovi1.jpg"],
["sarah-andersen","f/fe/Sarah_Andersen_-_Lucca_Comics_%26_Games_2016.jpg"],
["james-tynion-iv","3/3c/James_tynion_IV_1563015.jpg"],
["eddie-campbell","1/15/EddieCampbell.png"],
["charles-burns","3/3e/Sollies_Ville_-_Charles_Burns_-_P1200423.jpg"],
["moto-hagio","e/e9/Hagio_Moto_in_2008.jpg"],
["ben-templesmith","https://upload.wikimedia.org/wikipedia/commons/c/ca/Ben_Templesmith_at_Galaxy_Con_Columbus.jpg"],
["kouta-hirano","https://upload.wikimedia.org/wikipedia/commons/4/4b/Kouta_Hirano_20080705_Japan_Expo_04.jpg"],
];
await mkdir(outputDirectory,{recursive:true});
for(const [slug,file] of files){const url=file.startsWith("http")?file:`https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/${file}&w=1000`;const response=await fetch(url,{headers:{"user-agent":"henrique.dog editorial catalog"}});if(!response.ok)throw new Error(`${slug}: HTTP ${response.status}`);const position=slug==="charles-burns"?"east":"attention";const written=await sharp(Buffer.from(await response.arrayBuffer())).rotate().resize(640,800,{fit:"cover",position}).webp({quality:84}).toFile(path.join(outputDirectory,`${slug}.webp`));console.log(`${slug}: ${written.width}x${written.height}`)}
