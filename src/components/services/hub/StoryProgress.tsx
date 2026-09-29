import styles from "./ServiceHubView.module.scss";

export function StoryProgress({ chapter, label }: { chapter: 1 | 2 | 3 | 4 | 5 | 6 | 7; label: string }) {
  return (
    <div className={styles.storyProgress} data-chapter={chapter} aria-hidden="true">
      <span>{String(chapter).padStart(2, "0")} / 07</span>
      <i><b /></i>
      <span>{label} ↓</span>
    </div>
  );
}
