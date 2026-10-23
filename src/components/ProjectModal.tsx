import {
  Anchor,
  Badge,
  Button,
  Group,
  Image,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowRight, IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../content';
import badge from './projectBadges.module.css';

interface Props {
  project: Project | null;
  opened: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, opened, onClose }: Props) {
  const navigate = useNavigate();

  if (!project) return null;

  const hasDetail = Boolean(project.detail);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      radius={0}
      title={
        <Title order={3} size="h4" fw={600}>
          {project.title}
        </Title>
      }
    >
      <Stack gap="md">
        {project.images && project.images.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: project.images.length > 1 ? 2 : 1 }} spacing="xs">
            {project.images.map((src) => (
              <Image key={src} src={src} alt={project.title} radius={0} />
            ))}
          </SimpleGrid>
        ) : null}

        <Text c="dimmed">{project.description}</Text>

        <Group gap={6}>
          {project.tools.map((tool) => (
            <Badge key={tool} variant="outline" radius={0} size="sm" color="gray" className={badge.badge}>
              {tool}
            </Badge>
          ))}
        </Group>

        {/* Links */}
        <Group gap="md">
          {project.link ? (
            <Anchor href={project.link} target="_blank" rel="noopener noreferrer" size="sm">
              <Group gap={4} component="span" wrap="nowrap">
                <IconExternalLink size={14} /> Live
              </Group>
            </Anchor>
          ) : null}
          {project.source ? (
            <Anchor href={project.source} target="_blank" rel="noopener noreferrer" size="sm">
              <Group gap={4} component="span" wrap="nowrap">
                <IconBrandGithub size={14} /> Source
              </Group>
            </Anchor>
          ) : null}
          {project.links?.map((l) => (
            <Anchor key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" size="sm">
              {l.label}
            </Anchor>
          ))}
        </Group>

        {hasDetail ? (
          <Button
            variant="light"
            rightSection={<IconArrowRight size={16} />}
            onClick={() => {
              onClose();
              navigate(`/projects/${project.slug}`);
            }}
          >
            Read more
          </Button>
        ) : null}
      </Stack>
    </Modal>
  );
}
