import { estheticSmallCityBenchmark } from "@/data/benchmarks/esthetic-small-city";
import { cruzDasAlmas } from "@/data/cities/cruz-das-almas";
import { terezaCristina } from "@/data/clients/tereza-cristina";
import { defaultModelConstant } from "@/data/constants/model";
import { estheticSegment } from "@/data/segments/esthetic";
import type { Benchmark, City, Client, ModelConstant, Segment } from "@/domain/types";

export const cities: City[] = [cruzDasAlmas];

export const segments: Segment[] = [estheticSegment];

export const benchmarks: Benchmark[] = [estheticSmallCityBenchmark];

export const clients: Client[] = [terezaCristina];

export const modelConstant: ModelConstant = defaultModelConstant;
