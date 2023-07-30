import sys


def find_path(graph, start_edge):
    graph.at[start_edge, 'transport'] = 0
    stack = [start_edge]
    come_from = {}
    while stack:
        edge = stack.pop()
        graph.at[edge, 'visited'] = True
        graph.at[edge, 'visited_edges'] += 1
        for neighbor_edge in graph[graph.source == edge[1]].index:
            if not graph.at[neighbor_edge, 'visited']:
                graph.at[neighbor_edge, 'visited_edges'] += 1
                graph.at[neighbor_edge, 'visited'] = True
                new_cost = 1 - graph.at[neighbor_edge, 'weight'] + graph.at[edge, 'transport']
                if graph.at[neighbor_edge, 'transport'] < new_cost:
                    graph.at[neighbor_edge, 'transport'] = new_cost
                    graph.at[neighbor_edge, 'required_edges'] = graph.at[edge, 'required_edges'] + \
                                                                int(graph.at[neighbor_edge, 'required'])
                    come_from[neighbor_edge] = edge
                    graph.at[neighbor_edge, "come_from"] = edge
                    stack.append(neighbor_edge)
    path = []
    finish_edge = sort(graph, False)
    while finish_edge in come_from:
        graph.at[finish_edge, 'weight'] = 0
        graph.at[finish_edge, 'used'] += 1
        graph.at[finish_edge, 'required'] = 0
        graph.at[finish_edge, 'required_edges'] = 0
        finish_edge = come_from[finish_edge]
        path.insert(0, finish_edge)
    return path


# used_cost -- asc
# required -- desc
# neighbors -- desc
# weight -- asc
# required_cost -- asc
# visited_cost -- asc


def sort(graph, start):
    if start:
        graph.sort_values(
            ["used", "required", "neighbors", "weight"],
            ascending=[True, False, False, True], inplace=True)
    else:
        graph.sort_values(
            ["required_edges", "transport", "neighbors"],
            ascending=[False, True, False], inplace=True)
    return graph.index[0]


def init(graph):
    graph = graph.assign(transport=-100000)
    graph = graph.assign(required_edges=graph["required"].astype(int))
    graph = graph.assign(visited=0)
    graph = graph.assign(used=0)
    # graph = graph.assign(come_from=0)
    return graph


def run(graph):
    sys.setrecursionlimit(1000000000)
    start_edge = sort(graph, True)
    while 1:
        init(graph)
        path = find_path(graph, start_edge)
        path.extend(path)
        start_edge = sort(graph, True)
        if not start_edge:
            return path
        print(len(path))
