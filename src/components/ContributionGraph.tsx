import { useEffect, useState } from 'react';
import { Box, Group, Text, Tooltip } from '@mantine/core';
import classes from './ContributionGraph.module.css';

interface Day {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: Day[];
}

interface Props {
  username: string;
}

const API = 'https://github-contributions-api.jogruber.de/v4';

export function ContributionGraph({ username }: Props) {
  const [days, setDays] = useState<Day[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      try {
        const res = await fetch(`${API}/${username}?y=last`);
        if (!res.ok) throw new Error(String(res.status));
        const data: ApiResponse = await res.json();
        if (cancelled) return;
        setDays(data.contributions);
        setTotal(data.total.lastYear ?? null);
        setStatus('ok');
      } catch {
        if (cancelled) return;
        setStatus('error');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  if (status === 'loading') {
    return (
      <Text size="sm" c="dimmed">
        Loading contributions…
      </Text>
    );
  }

  if (status === 'error' || days.length === 0) {
    return (
      <Text size="sm" c="dimmed">
        Contribution graph unavailable.
      </Text>
    );
  }

  // Group days into weeks (columns). The API starts on the first day of the
  // range; pad the leading offset so weekday rows line up (0 = Sunday).
  const weeks: (Day | null)[][] = [];
  const firstWeekday = new Date(days[0].date).getDay();
  let current: (Day | null)[] = Array.from({ length: firstWeekday }, () => null);

  for (const day of days) {
    current.push(day);
    if (current.length === 7) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length > 0) {
    while (current.length < 7) current.push(null);
    weeks.push(current);
  }

  // Most recent day with at least one contribution (data is chronological).
  const lastActive = [...days].reverse().find((d) => d.count > 0) ?? null;
  const lastActiveLabel = lastActive
    ? new Date(lastActive.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <Box>
      {total !== null ? (
        <Text size="sm" c="dimmed" mb="xs">
          {total} contributions in the last year
        </Text>
      ) : null}

      <Box className={classes.scroll}>
        <div className={classes.grid}>
          {weeks.map((week, wi) => (
            <div key={wi} className={classes.week}>
              {week.map((day, di) =>
                day ? (
                  <Tooltip
                    key={day.date}
                    label={`${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`}
                    withArrow
                    openDelay={100}
                  >
                    <div
                      className={classes.cell}
                      data-level={day.level}
                      aria-label={`${day.count} contributions on ${day.date}`}
                    />
                  </Tooltip>
                ) : (
                  <div key={`empty-${wi}-${di}`} className={classes.cell} data-empty />
                ),
              )}
            </div>
          ))}
        </div>
      </Box>

      <Group gap={6} mt="xs" justify="flex-end">
        <Text size="xs" c="dimmed">
          Less
        </Text>
        {[0, 1, 2, 3, 4].map((lvl) => (
          <div key={lvl} className={classes.cell} data-level={lvl} />
        ))}
        <Text size="xs" c="dimmed">
          More
        </Text>
      </Group>

      {lastActiveLabel ? (
        <Text size="xs" c="dimmed" mt={4}>
          Latest contribution: {lastActiveLabel}
        </Text>
      ) : null}
    </Box>
  );
}
