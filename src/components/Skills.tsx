import { useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  SegmentedControl,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
  Title,
} from '@mantine/core';
import { IconBriefcase, IconMail } from '@tabler/icons-react';
import { content } from '../content';
import { Section } from './Section';

type View = 'experience' | 'skills';

function Experience() {
  return (
    <Timeline active={content.experience.length} bulletSize={24} lineWidth={2} maw={760}>
      {content.experience.map((item) => (
        <Timeline.Item
          key={`${item.title}-${item.start}`}
          bullet={
            <ThemeIcon size={24} radius="xl" variant="light" color="gray">
              <IconBriefcase size={13} />
            </ThemeIcon>
          }
          title={
            <Group gap="xs" align="baseline" wrap="wrap">
              <Text fw={600}>{item.title}</Text>
              <Text size="sm" c="dimmed">
                · {item.organization}
              </Text>
            </Group>
          }
        >
          <Text size="xs" c="dimmed" ff="monospace" mb={4}>
            {item.start} — {item.end}
          </Text>
          {item.description?.map((d, i) => (
            <Text key={i} size="sm" c="dimmed">
              {d}
            </Text>
          ))}
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

function SkillsList() {
  return (
    <Stack gap="lg" maw={760}>
      {content.skills.map((group) => (
        <Flex
          key={group.category}
          gap="md"
          align="baseline"
          direction={{ base: 'column', xs: 'row' }}
        >
          <Box w={{ base: 'auto', xs: 160 }} style={{ flexShrink: 0 }}>
            <Title
              order={3}
              size="h5"
              fw={600}
              tt="uppercase"
              fz="sm"
              className="accentText"
            >
              {group.category}
            </Title>
          </Box>
          <Text ff="monospace" c="dimmed">
            {group.items.join('  ·  ')}
          </Text>
        </Flex>
      ))}
    </Stack>
  );
}

export function Skills() {
  const [view, setView] = useState<View>('experience');

  return (
    <Section
      id="skills"
      title="Experience & Skills"
      action={
        <SegmentedControl
          value={view}
          onChange={(v) => setView(v as View)}
          radius="xl"
          data={[
            { label: 'Experience', value: 'experience' },
            { label: 'Skills', value: 'skills' },
          ]}
        />
      }
    >
      {view === 'experience' ? <Experience /> : <SkillsList />}

      {/* Contact — merged into this section so there's no full-screen gap. */}
      <Divider my="xl" />
      <ContactBlock />
    </Section>
  );
}

function ContactBlock() {
  return (
    <Stack gap="lg" maw={620} id="contact" style={{ scrollMarginTop: 80 }}>
      <Title order={2} size="h2" className="accentBar">
        Get In Touch
      </Title>
      <Text size="lg" c="dimmed">
        I’m currently open to new opportunities and collaborations. Whether you
        have a question or just want to say hi, my inbox is always open.
      </Text>
      <Button
        component="a"
        href={`mailto:${content.email}`}
        size="md"
        variant="outline"
        leftSection={<IconMail size={18} />}
        w="fit-content"
      >
        {content.email}
      </Button>
      <Group gap="lg" mt="xs">
        {content.socials.map((social) => (
          <Anchor
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            c="dimmed"
            size="sm"
          >
            {social.label} →
          </Anchor>
        ))}
      </Group>
    </Stack>
  );
}
