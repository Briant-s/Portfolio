import {
  Anchor,
  Badge,
  Button,
  Container,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconBrandGithub,
  IconExternalLink,
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { content } from '../content';
import badge from '../components/projectBadges.module.css';
import linkBtn from '../components/linkButton.module.css';

export function ProjectDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = content.projects.find((p) => p.slug === slug);

  // Unknown slug → friendly not-found state.
  if (!project) {
    return (
      <Container size="lg" py={{ base: 90, sm: 120 }}>
        <Stack gap="md" align="flex-start">
          <Title order={1}>Project not found</Title>
          <Text c="dimmed">
            We couldn’t find a project with that address.
          </Text>
          <Button
            variant="outline"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => navigate('/projects')}
          >
            Back to projects
          </Button>
        </Stack>
      </Container>
    );
  }

  const detail = project.detail;

  return (
    <Container size="md" py={{ base: 90, sm: 120 }}>
      <Stack gap="xl">
        <Button
          variant="subtle"
          size="sm"
          w="fit-content"
          px={0}
          className={linkBtn.linkButton}
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => navigate('/projects')}
        >
          All projects
        </Button>

        {/* Header */}
        <Stack gap="sm">
          <Title order={1} className="accentBar">
            {project.title}
          </Title>
          <Text size="lg" c="dimmed">
            {project.description}
          </Text>

          {/* Links */}
          <Group gap="md" mt="xs">
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

          {/* Tools */}
          <Group gap={6} mt="xs">
            {project.tools.map((tool) => (
              <Badge key={tool} variant="outline" radius={0} size="sm" color="gray" className={badge.badge}>
                {tool}
              </Badge>
            ))}
          </Group>
        </Stack>

        {/* Images */}
        {project.images && project.images.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: project.images.length > 1 ? 2 : 1 }} spacing="md">
            {project.images.map((src) => (
              <Image key={src} src={src} alt={project.title} radius={0} />
            ))}
          </SimpleGrid>
        ) : null}

        {/* Overview */}
        {detail?.overview?.length ? (
          <Stack gap="md">
            {detail.overview.map((p, i) => (
              <Text key={i} size="lg">
                {p}
              </Text>
            ))}
          </Stack>
        ) : (
          <Text c="dimmed">No additional write-up for this project yet.</Text>
        )}

        {/* Sections */}
        {detail?.sections?.map((section) => (
          <Stack key={section.heading} gap="sm">
            <Title order={2} size="h3">
              {section.heading}
            </Title>
            {section.body.map((p, i) => (
              <Text key={i} c="dimmed">
                {p}
              </Text>
            ))}
          </Stack>
        ))}
      </Stack>
    </Container>
  );
}
