import { Container, Group, Stack, Title } from '@mantine/core';
import type { ReactNode } from 'react';
import classes from './Section.module.css';

interface SectionProps {
  id: string;
  title: string;
  /** Optional element rendered beside the title (e.g. a "View all" button). */
  action?: ReactNode;
  children: ReactNode;
}

/**
 * Full-viewport-height section with an anchored id and a heading.
 * Content is vertically centered. `scroll-snap-align: start` is set so
 * snap scrolling can be enabled later on the scroll container.
 */
export function Section({ id, title, action, children }: SectionProps) {
  return (
    <section id={id} className={classes.section}>
      <Container size="lg" w="100%" className={classes.inner}>
        <Stack gap="xl">
          <Group justify="space-between" align="center" wrap="wrap" gap="md">
            <Title order={2} size="h1" className="accentBar">
              {title}
            </Title>
            {action}
          </Group>
          {children}
        </Stack>
      </Container>
    </section>
  );
}
