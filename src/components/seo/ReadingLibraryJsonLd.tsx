import type { ReadingWork } from "@/content/reading/readingSchema";
import { getReadingWorkPath } from "@/content/reading/readingDomain";
import { baseURL } from "@/resources";

export function ReadingLibraryJsonLd({ works, name, path }: { works: readonly ReadingWork[]; name: string; path: string }) {
  const data={"@context":"https://schema.org","@type":"CollectionPage",name,url:`${baseURL}${path}`,mainEntity:{"@type":"ItemList",numberOfItems:works.length,itemListElement:works.map((work,index)=>({"@type":"ListItem",position:index+1,item:{"@type":"Book",name:work.titleBr??work.originalTitle,alternateName:work.originalTitle,datePublished:work.publicationStart,url:`${baseURL}${getReadingWorkPath(work)}`,image:work.image?`${baseURL}${work.image.src}`:undefined}}))}};
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/>;
}
