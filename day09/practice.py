graph = {
    "Almaz": ["Dawit", "Tigest", "samuel"],
    "Dawit": ["Hana", "Almaz"],
    "Tigest": ["Almaz", "Samuel"],
    "Samuel": ["Hana", "Almaz", "Tigest"],
    "Hana": ["Dawit", "Samuel"],
}

from collections import deque
def bfs(graph, start):
    seen = {start}
    q = deque([start])

    while q:
        node = q.popleft()
    for n in graph[node]:
        if n not in seen:
            seen.add(n); q.append(n)


