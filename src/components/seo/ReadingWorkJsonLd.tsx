import type { ReadingEdition, ReadingWork } from "@/content/reading/readingSchema";
import { creators } from "@/content/creators/creators";
import { getReadingWorkPath, isComicWork } from "@/content/reading/readingDomain";
import { baseURL } from "@/resources";

export function ReadingWorkJsonLd({ work, editions }: { work: ReadingWork; editions: readonly ReadingEdition[] }) {
  if(work.status!=="published")return null;const people=new Map(creators.map((person)=>[person.id,person.name]));
  const evaluation=work.editorialEvaluation;const data={"@context":"https://schema.org","@type":"Book",name:work.titleBr??work.originalTitle,alternateName:[work.originalTitle,work.romanizedTitle].filter(Boolean),url:`${baseURL}${getReadingWorkPath(work)}`,description:work.shortDescription,inLanguage:work.originalLanguages,genre:work.genres,datePublished:work.publicationStart,image:work.image?`${baseURL}${work.image.src}`:undefined,author:work.credits.filter((credit)=>credit.roles.some((role)=>["author","writer","original-creator"].includes(role))).map((credit)=>({"@type":"Person",name:people.get(credit.personId)??credit.personId})),bookEdition:editions.filter((edition)=>edition.status==="published").map((edition)=>({"@type":"Book",name:edition.title,isbn:edition.isbn13??edition.isbn10,inLanguage:edition.language,bookFormat:edition.medium})),review:evaluation?{"@type":"Review",author:{"@type":"Person",name:evaluation.author},datePublished:evaluation.reviewedAt,reviewBody:evaluation.text,reviewRating:evaluation.score!==undefined?{"@type":"Rating",ratingValue:evaluation.score,bestRating:5,worstRating:0}:undefined}:undefined,additionalType:isComicWork(work)?"https://schema.org/ComicStory":undefined};
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(data)}}/>;
}
