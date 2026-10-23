import { Anchor, Box, Group, Stack, Text, Title } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import type { MonkeytypeStats } from '../content';
import classes from './Monkeytype.module.css';

interface Props {
  stats: MonkeytypeStats;
}

export function Monkeytype({ stats }: Props) {
  return (
    <Stack gap="lg">
      {/* Headline stats */}
      <Group gap={0} className={classes.stats}>
        <Stat value={`${stats.wpm}`} label="WPM" />
        <Stat value={`${stats.accuracy}%`} label="Accuracy" />
        <Stat value={stats.time} label="Time" />
      </Group>

      {/* Keyboard / setup */}
      {stats.keyboard.length > 0 ? (
        <Box>
          <Title order={4} size="h5" fw={600} tt="uppercase" fz="sm" mb="xs">
            My Setup
          </Title>
          <Stack gap={4}>
            {stats.keyboard.map((row) => (
              <Group key={row.label} gap="xs" wrap="nowrap">
                <Text size="sm" c="dimmed" w={90} style={{ flexShrink: 0 }}>
                  {row.label}
                </Text>
                <Text size="sm">{row.value}</Text>
              </Group>
            ))}
          </Stack>
        </Box>
      ) : null}

      <Anchor
        href={stats.profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        size="sm"
      >
        <Group gap={4} wrap="nowrap" component="span">
          View my Monkeytype profile
          <IconExternalLink size={14} />
        </Group>
      </Anchor>
    </Stack>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Box className={classes.stat}>
      <Text className={classes.statValue} fw={700}>
        {value}
      </Text>
      <Text size="xs" c="dimmed" tt="uppercase">
        {label}
      </Text>
    </Box>
  );
}
