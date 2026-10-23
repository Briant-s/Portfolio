import { Stack, Text, Title } from '@mantine/core';
import type { Project } from '../content';
import classes from './ProjectCard.module.css';

interface Props {
  project: Project;
  onOpen: (project: Project) => void;
}

/** Wide, text-based project row. Clickable to open the modal. */
export function ProjectCard({ project, onOpen }: Props) {
  return (
    <div
      className={classes.row}
      onClick={() => onOpen(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(project);
        }
      }}
      aria-label={`Open details for ${project.title}`}
    >
      <Stack gap="xs" maw={820}>
        <Title order={3} size="h4" fw={600}>
          {project.title}
        </Title>

        <Text c="dimmed">{project.description}</Text>

        <Text size="sm" c="dimmed" ff="monospace">
          {project.tools.join('  ·  ')}
        </Text>
      </Stack>
    </div>
  );
}
