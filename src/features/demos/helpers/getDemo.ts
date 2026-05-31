import { demoRegistry } from "../data/demo-registry";
import { demoSegments, type DemoSegmentSlug } from "../data/demo-segments";

export function getDemoSegment(slug: string) {
  return demoSegments.find((segment) => segment.slug === slug);
}

export function getDemoBySlug(segmentSlug: string, demoSlug: string) {
  return demoRegistry.find((demo) => demo.segment === segmentSlug && demo.slug === demoSlug);
}

export function getDemosBySegment(segmentSlug: string) {
  return demoRegistry.filter((demo) => demo.segment === segmentSlug);
}

export function getFeaturedDemos() {
  return demoRegistry.filter((demo) => demo.featured);
}

export function getDemosByStyle(style: string) {
  return demoRegistry.filter((demo) => demo.visualStyle === style);
}

export function getDemoStyles() {
  return Array.from(new Set(demoRegistry.map((demo) => demo.visualStyle)));
}

export function getSegmentDemoCount(segmentSlug: DemoSegmentSlug) {
  return getDemosBySegment(segmentSlug).length;
}

export function getIndexableDemoPaths() {
  return demoRegistry.filter((demo) => demo.indexable).map((demo) => demo.route);
}
