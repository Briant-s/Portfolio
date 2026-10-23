import { useMemo, useState } from 'react';
import {
  Badge,
  Button,
  Container,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { content, type Project } from '../content';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';

const ALL = 'All';

export function ProjectsPage() {
  const [active, setActive] = useState<Project | null>(null);
  const [opened, setOpened] = useState(false);

  // Selected type ("All" = no filter) and selected tools (empty = no filter).
  const [type, setType] = useState<string>(ALL);
  const [tools, setTools] = useState<string[]>([]);

  // Derive the available types and tools from the data.
  const { types, allTools } = useMemo(() => {
    const t = new Set<string>();
    const tl = new Set<string>();
    for (const p of content.projects) {
      t.add(p.type);
      p.tools.forEach((x) => tl.add(x));
    }
    return {
      types: [ALL, ...Array.from(t).sort()],
      allTools: Array.from(tl).sort(),
    };
  }, []);

  const toggleTool = (tool: string) =>
    setTools((prev) =>
      prev.includes(tool) ? prev.filter((x) => x !== tool) : [...prev, tool],
    );

  const filtered = useMemo(
    () =>
      content.projects.filter((p) => {
        const typeOk = type === ALL || p.type === type;
        // A project matches if it includes every selected tool (AND logic).
        const toolsOk = tools.every((x) => p.tools.includes(x));
        return typeOk && toolsOk;
      }),
    [type, tools],
  );

  const openProject = (project: Project) => {
    setActive(project);
    setOpened(true);
  };

  const clearFilters = () => {
    setType(ALL);
    setTools([]);
  };

  const hasFilters = type !== ALL || tools.length > 0;

  return (
    <Container size="lg" py={{ base: 90, sm: 120 }}>
      <Stack gap="xl">
        <Stack gap="xs">
          <Title order={1} className="accentBar">
            All Projects
          </Title>
          <Text c="dimmed">
            Filter by project type and the tools used.
          </Text>
        </Stack>

        {/* Type filter */}
        <Stack gap={6}>
          <Text size="sm" fw={600} tt="uppercase" c="dimmed">
            Type
          </Text>
          <Group gap="xs">
            {types.map((t) => (
              <Button
                key={t}
                size="xs"
                radius={0}
                variant={type === t ? 'filled' : 'default'}
                onClick={() => setType(t)}
              >
                {t}
              </Button>
            ))}
          </Group>
        </Stack>

        {/* Tool filter */}
        <Stack gap={6}>
          <Text size="sm" fw={600} tt="uppercase" c="dimmed">
            Tools
          </Text>
          <Group gap="xs">
            {allTools.map((tool) => {
              const selected = tools.includes(tool);
              return (
                <Badge
                  key={tool}
                  component="button"
                  variant={selected ? 'filled' : 'outline'}
                  color={selected ? undefined : 'gray'}
                  radius={0}
                  size="lg"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleTool(tool)}
                >
                  {tool}
                </Badge>
              );
            })}
          </Group>
        </Stack>

        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            {filtered.length} project{filtered.length === 1 ? '' : 's'}
          </Text>
          {hasFilters ? (
            <Button variant="subtle" size="xs" onClick={clearFilters}>
              Clear filters
            </Button>
          ) : null}
        </Group>

        {filtered.length > 0 ? (
          <Stack gap={0}>
            {filtered.map((project, i) => (
              <div key={project.slug}>
                {i > 0 ? <Divider my="sm" /> : null}
                <ProjectCard project={project} onOpen={openProject} />
              </div>
            ))}
          </Stack>
        ) : (
          <Text c="dimmed">No projects match the selected filters.</Text>
        )}
      </Stack>

      <ProjectModal
        project={active}
        opened={opened}
        onClose={() => setOpened(false)}
      />
    </Container>
  );
}
