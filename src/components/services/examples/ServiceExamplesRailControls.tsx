"use client";

export function ServiceExamplesRailControls({ trackId, className }: { trackId: string; className?: string }) {
  const move = (direction: -1 | 1) => {
    const track = document.getElementById(trackId);
    if (!track) return;
    track.scrollBy({ left: direction * Math.min(track.clientWidth * .82, 480), behavior: "smooth" });
  };

  return (
    <div className={className} role="group" aria-label="Navegar pelos projetos">
      <button type="button" onClick={() => move(-1)} aria-label="Ver projetos anteriores">←</button>
      <button type="button" onClick={() => move(1)} aria-label="Ver próximos projetos">→</button>
    </div>
  );
}
