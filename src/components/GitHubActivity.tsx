import { useEffect, useState } from 'react';
import { Anchor, Group, Loader, Stack, Text } from '@mantine/core';
import { ContributionGraph } from './ContributionGraph';

interface GitHubUser {
  login: string;
  name: string | null;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
}

interface Props {
  username: string;
}

const API = 'https://api.github.com';

export function GitHubActivity({ username }: Props) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      try {
        const userRes = await fetch(`${API}/users/${username}`);

        if (!userRes.ok) {
          throw new Error(
            userRes.status === 403
              ? 'GitHub API rate limit reached. Try again later.'
              : `GitHub user not found (${userRes.status}).`,
          );
        }

        const userData: GitHubUser = await userRes.json();
        if (cancelled) return;
        setUser(userData);
        setStatus('ok');
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load.');
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
      <Group gap="xs" c="dimmed">
        <Loader size="sm" />
        <Text size="sm">Loading GitHub activity…</Text>
      </Group>
    );
  }

  if (status === 'error' || !user) {
    return (
      <Stack gap="xs">
        <Text c="dimmed">{error || 'Could not load GitHub activity.'}</Text>
        <Anchor
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View @{username} on GitHub →
        </Anchor>
      </Stack>
    );
  }

  return (
    <Stack gap="lg">
      <Group gap="xl">
        <Stat label="Repositories" value={user.public_repos} />
        <Stat label="Followers" value={user.followers} />
        <Stat label="Following" value={user.following} />
      </Group>

      <ContributionGraph username={user.login} />

      <Anchor
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        size="sm"
      >
        View full profile →
      </Anchor>
    </Stack>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Stack gap={0}>
      <Text fw={700} size="xl">
        {value}
      </Text>
      <Text size="xs" c="dimmed" tt="uppercase">
        {label}
      </Text>
    </Stack>
  );
}
