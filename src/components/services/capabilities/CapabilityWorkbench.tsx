"use client";

import { KeyboardEvent, useState } from "react";
import styles from "./CapabilityWorkbench.module.scss";

const moduleTabs = [
  { id: "filter", label: "Filtros" },
  { id: "status", label: "Lista com status" },
  { id: "mobile", label: "Menu mobile" },
  { id: "onboarding", label: "Fluxo inicial" },
] as const;

const wireframes = [
  ["home", "Home", "Resumo, caminhos principais e uma ação clara."],
  ["listing", "Listagem", "Filtros e itens organizados para comparação."],
  ["detail", "Detalhe", "Conteúdo principal, contexto e próxima ação."],
  ["contact", "Contato", "Campos essenciais, orientação e confirmação."],
  ["schedule", "Agenda", "Escolha, revisão e confirmação de horário."],
  ["catalog", "Catálogo", "Categorias, busca e itens consistentes."],
  ["gallery", "Galeria", "Imagem em destaque e navegação entre trabalhos."],
  ["dashboard", "Mini painel", "Resumo de estado, pendências e atalhos."],
] as const;

function moveTab(event: KeyboardEvent<HTMLButtonElement>, index: number, count: number, select: (index: number) => void) {
  if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
  event.preventDefault();
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + count) % count;
  event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("[role='tab']")[next]?.focus();
  select(next);
}

export function CapabilityWorkbench() {
  const [moduleId, setModuleId] = useState<(typeof moduleTabs)[number]['id']>('filter');
  const [filter, setFilter] = useState('Todos');
  const [selectedItem, setSelectedItem] = useState('Página inicial');
  const [mobileArea, setMobileArea] = useState('Início');
  const [step, setStep] = useState(1);
  const [wireframeId, setWireframeId] = useState<(typeof wireframes)[number][0]>('home');
  const selectedWireframe = wireframes.find(([id]) => id === wireframeId) ?? wireframes[0];

  return <>
    <section className={styles.modules} id="modulos" aria-labelledby="modules-title">
      <div className={styles.sectionHeading}><p>Módulos de interface</p><h2 id="modules-title">Peças de uma experiência maior.</h2><span>Teste estados pequenos sem carregar uma aplicação inteira.</span></div>
      <div className={styles.moduleBox}>
        <div className={styles.moduleTabs} role="tablist" aria-label="Exemplos de módulos">
          {moduleTabs.map((item,index) => <button id={`module-tab-${item.id}`} role="tab" aria-selected={moduleId === item.id} aria-controls="module-panel" tabIndex={moduleId === item.id ? 0 : -1} type="button" onClick={() => setModuleId(item.id)} onKeyDown={(event) => moveTab(event,index,moduleTabs.length,(next) => setModuleId(moduleTabs[next].id))} key={item.id}>{item.label}</button>)}
        </div>
        <div className={styles.modulePanel} id="module-panel" role="tabpanel" aria-labelledby={`module-tab-${moduleId}`}>
          {moduleId === 'filter' ? <div className={styles.filterDemo}><p>Projetos</p><div role="group" aria-label="Filtrar projetos">{['Todos','Publicados','Em revisão'].map((item) => <button type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><ul><li><span>Site institucional</span><b>Publicado</b></li><li><span>Catálogo visual</span><b>{filter === 'Em revisão' ? 'Em revisão' : 'Publicado'}</b></li></ul><small aria-live="polite">Filtro selecionado: {filter}</small></div> : null}
          {moduleId === 'status' ? <div className={styles.statusDemo}><p>Estrutura do site</p>{['Página inicial','Serviços','Contato'].map((item,index) => <button type="button" aria-pressed={selectedItem === item} onClick={() => setSelectedItem(item)} key={item}><span>0{index + 1}</span><strong>{item}</strong><small>{index === 2 ? 'Pendente' : 'Pronto'}</small></button>)}<em aria-live="polite">Selecionado: {selectedItem}</em></div> : null}
          {moduleId === 'mobile' ? <div className={styles.mobileDemo}><div><span>hr.</span><b>{mobileArea}</b></div><p>{mobileArea === 'Início' ? 'Resumo do projeto e próximas ações.' : mobileArea === 'Itens' ? 'Itens organizados em uma lista curta.' : 'Dados e preferências da área.'}</p><nav aria-label="Navegação demonstrativa">{['Início','Itens','Perfil'].map((item) => <button type="button" aria-pressed={mobileArea === item} onClick={() => setMobileArea(item)} key={item}>{item}</button>)}</nav></div> : null}
          {moduleId === 'onboarding' ? <div className={styles.onboardingDemo}><span>ETAPA {step} DE 3</span><h3>{step === 1 ? 'Qual é o objetivo?' : step === 2 ? 'Que conteúdo já existe?' : 'Revise as escolhas.'}</h3><p>{step === 1 ? 'Defina a ação principal do site.' : step === 2 ? 'Separe textos, imagens e informações de contato.' : 'Confirme o que entra na primeira versão.'}</p><div><button type="button" disabled={step === 1} onClick={() => setStep((value) => Math.max(1,value - 1))}>Voltar</button><button type="button" disabled={step === 3} onClick={() => setStep((value) => Math.min(3,value + 1))}>Continuar</button></div></div> : null}
        </div>
      </div>
    </section>

    <section className={styles.wireframes} id="wireframes" aria-labelledby="wireframes-title">
      <div className={styles.sectionHeading}><p>Wireframes e estruturas</p><h2 id="wireframes-title">Antes do acabamento, o fluxo.</h2><span>Selecione uma tela para ver como a informação pode ser organizada.</span></div>
      <div className={styles.wireframeBox}>
        <div className={styles.wireframeChoices} role="group" aria-label="Selecionar estrutura">{wireframes.map(([id,title]) => <button type="button" aria-pressed={wireframeId === id} onClick={() => setWireframeId(id)} key={id}>{title}</button>)}</div>
        <div className={styles.wireframePreview} data-layout={selectedWireframe[0]}>
          <div className={styles.browserBar}><i /><i /><i /><span>estrutura/{selectedWireframe[0]}</span></div>
          <div className={styles.canvas} aria-hidden="true"><header><b /><i /></header><aside><i /><i /><i /></aside><main><span /><strong /><p /><p /><div><i /><i /><i /></div><button /></main></div>
          <div className={styles.wireframeCopy}><span>Estrutura selecionada</span><h3>{selectedWireframe[1]}</h3><p>{selectedWireframe[2]}</p></div>
        </div>
      </div>
    </section>
  </>;
}
