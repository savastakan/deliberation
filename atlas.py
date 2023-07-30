import sys
from collections import defaultdict
import networkx as nx


def find_paths(graph, required, parent, required_cost, weight_cost, start_edge):
    stack = [start_edge]
    visited = []
    max_profit = -sys.maxsize
    finish_edge = start_edge
    while stack:
        edge = stack.pop()
        visited.append(edge)
        for neighbor_edge in graph.edges(edge[1]):
            if neighbor_edge not in visited:
                visited.append(neighbor_edge)
                required_cost[neighbor_edge] = required_cost[edge] + int(neighbor_edge in required)
                weight_cost[neighbor_edge] = weight_cost[edge] + graph[neighbor_edge[0]][neighbor_edge[1]]['weight']
                stack.append(neighbor_edge)
                parent[neighbor_edge] = edge
                if max_profit < required_cost[neighbor_edge]:
                    max_profit = required_cost[neighbor_edge]
                    finish_edge = neighbor_edge

    path = [finish_edge]
    edge = finish_edge
    while edge in parent:
        required.discard(edge)
        edge = parent[edge]
        path.insert(0, edge)
    return path

def run(graph):

    required_cost = dict()
    start_edge = sorted(nx.edge_betweenness_centrality(graph), key=lambda x: x[1])[1]
    weight_cost = defaultdict(int, {edge: 0 if start_edge else -sys.maxsize for edge in graph.edges})
    required_cost[start_edge] = graph[start_edge[0]][start_edge[1]]['required']
    required = set()
    for edge in graph.edges:
        if graph[edge[0]][edge[1]]['required'] == 1:
            required.add(edge)

    weight_cost[start_edge] = 0
    path = [start_edge]
    while len(required) > 0:
        parent = dict()
        path = find_paths(graph, required, parent, required_cost, weight_cost, start_edge)
        path.extend(path)
        start_edge = path[-1]
        print("required_cost : ", len(required))
    print(path)
