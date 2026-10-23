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

  const featured = content.projects.slice(0, HOME_COUNT);

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
