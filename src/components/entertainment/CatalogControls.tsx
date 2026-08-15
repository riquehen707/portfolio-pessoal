import styles from "./CatalogControls.module.scss";

export type CatalogFilter = {
  id: string;
  label: string;
  value: string;
  allLabel: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
};

export function CatalogControls({ query, onQueryChange, placeholder, filters, sort, sortOptions, onSortChange, resultCount, singular, plural, hasFilters, onClear }: {
  query: string;
  onQueryChange: (value: string) => void;
  placeholder: string;
  filters: CatalogFilter[];
  sort: string;
  sortOptions: Array<{ value: string; label: string }>;
  onSortChange: (value: string) => void;
  resultCount: number;
  singular: string;
  plural: string;
  hasFilters: boolean;
  onClear: () => void;
}) {
  return <>
    <div className={styles.panel} aria-label="Filtros do acervo">
      <label className={styles.search}><span>Buscar no acervo</span><input type="search" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder={placeholder}/></label>
      <div className={styles.facets} data-count={filters.length + 1}>
        {filters.map((filter) => <label key={filter.id}><span>{filter.label}</span><select value={filter.value} onChange={(event) => filter.onChange(event.target.value)}><option value="all">{filter.allLabel}</option>{filter.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>)}
        <label><span>Ordem</span><select value={sort} onChange={(event) => onSortChange(event.target.value)}>{sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
      </div>
    </div>
    <div className={styles.resultBar}><p aria-live="polite">{resultCount} {resultCount === 1 ? singular : plural}</p>{hasFilters ? <button onClick={onClear} type="button">Limpar filtros</button> : null}</div>
  </>;
}

export function CatalogEmpty({ noun, onClear }: { noun: string; onClear: () => void }) {
  return <div className={styles.empty}><strong>Nenhuma {noun} combina com esses filtros.</strong><p>Tente remover uma opção ou buscar por um termo mais amplo.</p><button onClick={onClear} type="button">Mostrar todo o acervo</button></div>;
}

export function CatalogLoadMore({ onLoadMore }: { onLoadMore: () => void }) {
  return <div className={styles.loadMore}><button onClick={onLoadMore} type="button">Carregar mais</button></div>;
}
