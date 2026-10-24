import { useState } from 'react';
import { Button, Divider, Stack } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { content, type Project } from '../content';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Section } from './Section';

const HOME_COUNT = 3;

export function Projects() {
  const navigate = useNavigate();
  const [active, setActive] = useState<Project | null>(null);
  const [opened, setOpened] = useState(false);

  // Featured picks come from content.featuredSlugs (in that order). Fall back
  // to the first HOME_COUNT projects if no valid slugs are configured.
  const bySlug = new Map(content.projects.map((p) => [p.slug, p]));
  const picked = (content.featuredSlugs ?? [])
    .map((slug) => bySlug.get(slug))
    .filter((p): p is Project => Boolean(p));
  const featured =
    picked.length > 0 ? picked : content.projects.slice(0, HOME_COUNT);

  const openProject = (project: Project) => {
    setActive(project);
    setOpened(true);
  };

  return (
    <Section
      id="projects"
      title="Projects"
      action={
        <Button
          variant="outline"
          size="sm"
          rightSection={<IconArrowRight size={16} />}
          onClick={() => navigate('/projects')}
        >
          View all projects
        </Button>
      }
    >
      <Stack gap={0}>
        {featured.map((project, i) => (
          <div key={project.slug}>
            {i > 0 ? <Divider my="sm" /> : null}
            <ProjectCard project={project} onOpen={openProject} />
          </div>
        ))}
      </Stack>

      <ProjectModal
        project={active}
        opened={opened}
        onClose={() => setOpened(false)}
      />
    </Section>
  );
}
